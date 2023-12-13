import React, { useState, useEffect } from "react";
import Icons from "../../assets/icons/Icons";
import { Waveform } from "@uiball/loaders";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const TableAddPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const paymentCollectionRef = collection(db, "Payments");
        const snapshot = await getDocs(paymentCollectionRef);
        let paymentData = [];

        snapshot.forEach((doc) => {
          if (doc.exists()) {
            const specificDocument = doc.data();
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

  const filteredPayments = payments.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPayments.slice(indexOfFirstRecord, indexOfLastRecord);

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

  return (
    <div className="mx-[1.5rem]">
      <div className="w-full flex justify-end gap-[8px]">
        <input
          type="search"
          className="w-[50%] border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                <td>{item.itemName}</td>
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
                <Icons.Left/>
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  className={`${
                    currentPage === index + 1 ? "bg-orange text-white" : "bg-white text-orange"
                  } px-2 py-1 border border-orange rounded-full`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Icons.Right/>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableAddPayment;
