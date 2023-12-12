import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
import { Waveform } from "@uiball/loaders";

const TableAddPayment = () => {
  const [payments, setPayments] = useState([
    {
      itemName: "Item 1",
      amount: 5,
      pricePerItem: 10,
      totalPrice: 50,
      date: "2023-01-01",
    },
    {
      itemName: "Item 2",
      amount: 3,
      pricePerItem: 15,
      totalPrice: 45,
      date: "2023-02-15",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchClientData = async () => {
//       try {
//         const docRef = collection(db, "Clients");
//         const snapshot = await getDocs(docRef);
//         let clientData = [];

//         snapshot.forEach((doc) => {
//           if (doc.exists()) {
//             const specificDocument = doc.data();

//             specificDocument.id = doc.id;
//             clientData.push(specificDocument);
//             console.log(specificDocument);
//           }
//         });

//         setClients(clientData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching client data:", error);
//         setLoading(false);
//       }
//     };

//     fetchClientData();
//   }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredPayments = payments.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredClients.slice(indexOfFirstRecord, indexOfLastRecord);

//   const totalPages = Math.ceil(filteredClients.length / recordsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

  return (
    <div className="mx-[1.5rem]">
      <div className="w-full flex justify-end gap-[8px]">
        <input
          type="search"
          className="w-[50%] border border-red rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
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
              <td colSpan="4" className="text-[0.7rem]">
                <div className="flex justify-center items-center">
                    <Waveform size={25} color="#990000" />
                </div>
              </td>
            </tr>
          ) : filteredPayments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-[0.7rem]">
                No Records Found
              </td>
            </tr>
          ) : (
            filteredPayments.map((item, index) => (
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
      {/* <div className="flex justify-end mt-4">
        <nav>
          <ul className="pagination flex">
            <li>
              <button
                className="px-4 py-2 border border-red rounded-full bg-red text-white"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  className={`${
                    currentPage === index + 1 ? "bg-red text-white" : "bg-white text-red"
                  } px-4 py-2 border border-red rounded-full`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-4 py-2 border border-red rounded-full bg-red text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
};

export default TableAddPayment;
