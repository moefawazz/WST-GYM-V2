import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../assets/icons/Icons";
import { Waveform } from "@uiball/loaders";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const TableAddPayment = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const paymentCollectionRef = collection(db, "Payments");
        const snapshot = await getDocs(paymentCollectionRef);
        let paymentData = [];

        snapshot.forEach((doc) => {
          if (doc.exists()) {
            const specificDocument = doc.data();

            specificDocument.id = doc.id;
            paymentData.push(specificDocument);
          }
        });

        setPayments(paymentData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredPayments = payments.filter((item) => {
    // Check for selected month and/or year
    const dateObject = item.date && item.date.toDate && typeof item.date.toDate === 'function' ? item.date.toDate() : null;
    const month = dateObject ? dateObject.getMonth() + 1 : null; // JavaScript months are 0-indexed
    const year = dateObject ? dateObject.getFullYear() : null;

    if (selectedMonth !== "All" && selectedYear !== "All") {
      return month === parseInt(selectedMonth) && year === parseInt(selectedYear);
    } else if (selectedMonth !== "All") {
      return month === parseInt(selectedMonth);
    } else if (selectedYear !== "All") {
      return year === parseInt(selectedYear);
    }

    // Check for search term match
    const searchMatch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPayments.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredPayments.length / recordsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getTotalPayments = () => {
    return filteredPayments.reduce((total, item) => total + parseFloat(item.totalPrice), 0);
  };

  return (
    <div className="mx-[1.5rem]">
      <div className="w-full flex  gap-[8px]">
        <input
          type="search"
          className="w-[50%] border border-orange rounded-[0.25rem] mt-4  h-[10%] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <div className="flex  gap-[8px] items-center mt-4">
        <div className="w-[50%]">
          <select
            className="w-full border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] bg-white outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {new Date(2023, index, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[50%]">
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
      </div>
      </div>
      <table className="dash-table">
        <thead>
          <tr className=" text-[0.7rem]">
            <th>Item</th>
            <th>Quantity</th>
            <th>Price Per Item</th>
            <th>Total</th>
            <th>Date</th>
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
                <td
                  onClick={() => {
                    navigate(`/paymentEdit/${item.id}`);
                    scrollToTop();
                    console.log(item.id);
                  }}
                  className="cursor-pointer"
                >
                  {item.itemName}
                </td>
                <td>{item.amount}</td>
                <td>{item.pricePerItem}</td>
                <td>{item.totalPrice}</td>
                <td>{item.date}</td>
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
        <h2 className="text-[1rem] font-semibold">Total Payments</h2>
        <p>Total: {getTotalPayments()} $</p>
      </div>
    </div>
  );
};

export default TableAddPayment;
