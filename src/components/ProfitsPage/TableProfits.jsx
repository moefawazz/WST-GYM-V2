import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Waveform } from "@uiball/loaders";
import Icons from "../../assets/icons/Icons";

const TableProfits = () => {
  const navigate = useNavigate();
  const [profits, setProfits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    const fetchProfitsData = async () => {
      try {
        const docRef = collection(db, "Profits");
        const snapshot = await getDocs(docRef);
        let profitsData = [];

        snapshot.forEach((doc) => {
          if (doc.exists()) {
            const specificDocument = doc.data();

            specificDocument.id = doc.id;
            profitsData.push(specificDocument);
          }
        });

        // Filter data based on the selected month and/or year
        profitsData = profitsData.filter((item) => {
          const month = item.startDate?.toDate().getMonth() + 1; // JavaScript months are 0-indexed
          const year = item.startDate?.toDate().getFullYear();

          if (selectedMonth !== "All" && selectedYear !== "All") {
            return (
              month === parseInt(selectedMonth) &&
              year === parseInt(selectedYear)
            );
          } else if (selectedMonth !== "All") {
            return month === parseInt(selectedMonth);
          } else if (selectedYear !== "All") {
            return year === parseInt(selectedYear);
          }

          return true; // No filter selected
        });

        setProfits(profitsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profits data:", error);
        setLoading(false);
      }
    };

    fetchProfitsData();
  }, [selectedMonth, selectedYear]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formatStartDate = (startDate) => {
    if (startDate && startDate.toDate) {
      const dateObject = startDate.toDate();
      const formattedDate = dateObject.toLocaleDateString(); // Customize this as needed
      return formattedDate;
    }
    return "N/A";
  };

  const calculatePayment = (type) => {
    switch (type) {
      case "Gym":
        return "15";
      case "Zumba":
        return "15";

      default:
        return "$0";
    }
  };

  const getTotalAmountByType = (type) => {
    const filteredByType = profits.filter((item) => item.clientType === type);
    return filteredByType.reduce(
      (total, item) => total + parseFloat(calculatePayment(item.clientType)),
      0
    );
  };

  const calculateOverallTotal = () => {
    return profits.reduce(
      (total, item) => total + parseFloat(calculatePayment(item.clientType)),
      0
    );
  };

  const filteredProfits = profits.filter((item) => {
    const clientId = item.clientId;
    const clientType = item.clientType;

    // Check for selected category
    const categoryMatch =
      selectedCategory === "All" || clientType === selectedCategory;

    // Check for search term match
    const searchMatch =
      clientId || clientType.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredProfits.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredProfits.length / recordsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="mx-[1.5rem]">
      <div className="w-full flex justify-end gap-[8px] items-center">
        <div className="w-[25%]">
          <select
            className="w-full border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] bg-white outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {new Date(2023, index, 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[25%]">
          <select
            className="w-full border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] bg-white outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            {/* Add more years as needed */}
          </select>
        </div>
        <div className="w-[25%]">
          <select
            className="w-full border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] bg-white outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Zumba">Zumba</option>
            <option value="Gym">Gym</option>
          </select>
        </div>
        <input
          type="search"
          className="w-[25%] border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="dash-table">
        <thead>
          <tr className="text-[0.7rem]">
            <th>Name</th>
            <th>Type</th>
            <th>Subscription day</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-[0.7rem]">
                <div className="flex justify-center items-center">
                  <Waveform size={25} color="#f99f3d" />
                </div>
              </td>
            </tr>
          ) : currentRecords.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-[0.7rem]">
                No Records Found
              </td>
            </tr>
          ) : (
            currentRecords.map((item, index) => (
              <tr key={index} className="text-[0.7rem]">
                <td>
                  {item.Name} {item.LastName}
                </td>
                <td>{item.clientType}</td>
                <td>{formatStartDate(item.startDate)}</td>
                <td>{calculatePayment(item.clientType)} $</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 text-[0.8rem]">
        <nav>
          <ul className="pagination flex">
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <Icons.Left />
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => {
              const startPage = Math.max(1, currentPage - 1);
              const endPage = Math.min(totalPages, startPage + 2);

              if (index + 1 >= startPage && index + 1 <= endPage) {
                return (
                  <li key={index} className="mx-1">
                    <button
                      className={`${
                        currentPage === index + 1
                          ? "bg-orange text-white"
                          : "bg-white text-orange"
                      } px-2 py-1 border border-orange rounded-full`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              }

              // Add a condition to render ellipsis (...) when not in the range

              return null;
            })}
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Icons.Right />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-4">
        <h2 className="text-[1rem] font-semibold">Total Amount by Type</h2>
        <div>
          <p>Gym: {getTotalAmountByType("Gym")} $</p>
          <p>Zumba: {getTotalAmountByType("Zumba")} $</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-[1rem] font-semibold">Overall Total</h2>
        <p>Total: {calculateOverallTotal()} $</p>
      </div>
    </div>
  );
};

export default TableProfits;
