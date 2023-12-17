import React, { useState, useEffect } from "react";
import Image from "../../assets/images/profile.webp";
import Icons from "../../assets/icons/Icons";
import { useParams, useNavigate } from "react-router-dom";
import PopUpPayment from "../popUp/PopUpPayment";
import PopUpDelete from "../popUp/PopUpDelete";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Waveform } from "@uiball/loaders";

const PaymentEdit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const { id } = useParams();
  const [paymentData, setPaymentData] = useState(null);

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
  };

  const fetchPaymentData = async () => {
    try {
      const docRef = doc(db, "Payments", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const paymentData = docSnap.data();
        setPaymentData(paymentData);
      } else {
        console.error("Payment not found");
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaymentData();
    }
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const paymentDocRef = doc(db, "Payments", id);
      await updateDoc(paymentDocRef, updatedData);
      toast.success("Payment updated successfully", {
        theme: "colored",
      });

      setIsModalUpdateOpen(false);
      fetchPaymentData();
    } catch (error) {
      toast.error("Error updating the payment", {
        theme: "colored",
      });
      console.error("Error updating payment data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const paymentDocRef = doc(db, "Payments", id);
      await deleteDoc(paymentDocRef);
      toast.success("Payment deleted successfully", {
        theme: "colored",
      });

      navigate("/Payments");
    } catch (error) {
      toast.error("Error deleting the payment", {
        theme: "colored",
      });
      console.error("Error deleting payment:", error);
    }
  };

  return (
    <div className="m-[1.5rem] flex justify-center items-center flex-col gap-[1.25rem] text-center relative">
      <div
        onClick={() => {
          navigate("/Payments");
        }}
        className="absolute left-0 top-0 flex items-center text-orange cursor-pointer"
      >
        <Icons.Back />
        back
      </div>
      {paymentData ? (
        <>
          <div>
            <h1 className="text-orange">Item Name</h1>
            <h2>{paymentData.itemName}</h2>
          </div>
          <div>
            <h1 className="text-orange">Quantity</h1>
            <h2>{paymentData.amount}</h2>
          </div>
          <div>
            <h1 className="text-orange">Price Per Item</h1>
            <h2>{paymentData.pricePerItem}</h2>
          </div>
          <div>
            <h1 className="text-orange">Total</h1>
            <h2>{paymentData.totalPrice}</h2>
          </div>
          <div>
            <h1 className="text-orange">Date</h1>
            <h2>{paymentData.date}</h2>
          </div>

          <div className="flex items-center gap-[1.25rem] mt-[1.25rem]">
            <div
              className="rounded-[0.25rem] bg-green-600 p-[0.25rem] text-white"
              onClick={() => setIsModalUpdateOpen(true)}
            >
              <Icons.Edit />
            </div>
            <div
              className="rounded-[0.25rem] bg-red-600 p-[0.25rem] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Icons.Delete />
            </div>
          </div>
          <ToastContainer />
          <PopUpDelete
            isOpen={isModalOpen}
            title="Delete Payment"
            text="Are you sure you want to delete?"
            confirmText="Delete"
            bgColor="bg-red-600"
            onCancel={closeDeleteModal}
            onConfirm={handleDelete}
          />

          <PopUpPayment
            isOpen={isModalUpdateOpen}
            title="Update Payment"
            text=""
            confirmText="Update"
            bgColor="bg-green-600"
            onCancel={closeDeleteModal}
            handleUpdate={handleUpdate}
            initialData={paymentData}
          />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <Waveform size={25} color="#f99f3d" />
        </div>
      )}
    </div>
  );
};

export default PaymentEdit;
