import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc, 
  doc,       
} from "firebase/firestore";
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

        snapshot.forEach((d) => {
          if (d.exists()) {
            const specificDocument = d.data();
            specificDocument.id = d.id;
            profitsData.push(specificDocument);
          }
        });

        profitsData = profitsData.filter((item) => {
          const month = item.startDate?.toDate?.().getMonth() + 1;
          const year = item.startDate?.toDate?.().getFullYear();

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
          return true;
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

  const formatStartDate = (startDate) => {
    if (startDate && startDate.toDate) {
      const dateObject = startDate.toDate();
      return dateObject.toLocaleDateString();
    }
    return "N/A";
  };

  const getPaymentValue = (item) => {
    const n = Number(item?.Payment);
    return Number.isFinite(n) ? n : 0;
  };

  const calculateOverallTotal = () => {
    return profits.reduce((total, item) => total + getPaymentValue(item), 0);
  };

  const filteredProfits = profits.filter((item) => {
    const clientType = (item.clientType || "").toLowerCase();
    const clientId = String(item.clientId || "").toLowerCase();
    const fullName = `${item.Name || ""} ${item.LastName || ""}`.toLowerCase();

    const categoryMatch =
      selectedCategory === "All" || item.clientType === selectedCategory;

    const q = searchTerm.trim().toLowerCase();
    const searchMatch =
      q === "" ||
      clientId.includes(q) ||
      clientType.includes(q) ||
      fullName.includes(q);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedMonth, selectedYear]);

  // ✅ NEW: delete handler
  const handleDelete = async (profitId) => {
    if (!profitId) return;

    const ok = window.confirm("Are you sure you want to delete this record?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "Profits", profitId));
      // update UI without refetch
      setProfits((prev) => prev.filter((p) => p.id !== profitId));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="mx-[1.5rem]">
      <div className="w-full flex justify-end gap-[8px] items-center">
        <div className="w-[33%]">
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

        <div className="w-[33%]">
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
          </select>
        </div>

        <input
          type="search"
          className="w-[33%] border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
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
            <th>Action</th> {/* ✅ NEW */}
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
              <tr key={item.id || index} className="text-[0.7rem]">
                <td>
                  {item.Name} {item.LastName}
                </td>
                <td>{item.clientType}</td>
                <td>{formatStartDate(item.startDate)}</td>
                <td>{getPaymentValue(item)} $</td>
                <td>
                  <button
                    className="px-3 py-1 border border-red-500 text-red-500 rounded-[0.25rem] hover:bg-red-500 hover:text-white transition"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
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
              return null;
            })}

            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <Icons.Right />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-4">
        <h2 className="text-[1rem] font-semibold">Overall Total</h2>
        <p>Total: {calculateOverallTotal()} $</p>
      </div>
    </div>
  );
};

export default TableProfits;
