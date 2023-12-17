import React, { useState, useEffect } from "react";
import Image from "../../assets/images/profile.webp";
import Icons from "../../assets/icons/Icons";
import { useParams, useNavigate } from "react-router-dom";
import PopUpPayment from "../popUp/PopUpPayment";
import PopUpDelete from "../popUp/PopUpDelete";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc,collection,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Waveform } from "@uiball/loaders";

const PaymentEdit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [paymentData, setPaymentData] = useState([
    {
      itemName: "Product 1",
      amount: 2,
      date: "17/12/2023",
      pricePerItem: 25.99,
      totalPrice: 51.98,
    },
  ]);
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
  };

  const fetchClientData = async () => {
    try {
      const docRef = doc(db, "Clients", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const clientData = docSnap.data();
        setClientData(clientData);
      } else {
        console.error("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClientData();
    }
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      // Update the document in the Firestore collection
      const clientDocRef = doc(db, "Clients", id);
      await updateDoc(clientDocRef, updatedData);
      toast.success("client updated succesfully", {
        theme: "colored",
      });

      setIsModalUpdateOpen(false);
      fetchClientData();
    } catch (error) {
      toast.error("error updating the client", {
        theme: "colored",
      });
      console.error("Error updating client data:", error);
    }
  };


  const handleDelete = async () => {
    try {
      console.log("hi");
      const clientDocRef = doc(db, "Clients", id);
      await deleteDoc(clientDocRef);
      toast.success("Client deleted successfully", {
        theme: "colored",
      });

      navigate("/client");
    } catch (error) {
      toast.error("Error deleting the client", {
        theme: "colored",
      });
      console.error("Error deleting client:", error);
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
            <h2>{paymentData.itemName}product 1</h2>
          </div>
          <div>
            <h1 className="text-orange">Quantity</h1>
            <h2>{paymentData.amount} 10</h2>
          </div>
          <div>
            <h1 className="text-orange">Price Per Item</h1>
            <h2>{paymentData.pricePerItem} 5</h2>
          </div>
          <div>
            <h1 className="text-orange">Total</h1>
            <h2>{paymentData.totalPrice} 50</h2>
          </div>
          <div>
            <h1 className="text-orange">Date</h1>
            <h2>{paymentData.date} 12/17/2023</h2>
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
            initialData={clientData}
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
