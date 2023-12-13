import React, { useState, useEffect } from "react";
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
    </div>
  );
};

export default TableAddPayment;
