import React, { useState, useEffect } from "react";
import Image from "../../assets/images/profile.webp";
import Icons from "../../assets/icons/Icons";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "../popUp/PopUp";
import PopUpUpdate from "../popUp/PopUpUpdate";
import PopUpDelete from "../popUp/PopUpDelete"
import { db } from "../../firebase";
import { doc, getDoc,updateDoc,deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalRenewOpen, setIsModalRenewOpen] = useState(false);
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalRenewOpen(false);
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
toast.success("client updated succesfully")
 
      setIsModalUpdateOpen(false);
      fetchClientData();
    } catch (error) {
      toast.error("error updating the client")
      console.error("Error updating client data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("hi")
      const clientDocRef = doc(db, "Clients", id);
      await deleteDoc(clientDocRef);
      toast.success("Client deleted successfully");

 
      navigate("/client");
    } catch (error) {
      toast.error("Error deleting the client");
      console.error("Error deleting client:", error);
    }
  };

  const handleRenew = async () => {
    try {
      const clientDocRef = doc(db, "Clients", id);
      const clientDoc = await getDoc(clientDocRef);

      if (clientDoc.exists()) {
        const currentEndDate = clientDoc.data().EndDate.toDate();
        const newEndDate = new Date(currentEndDate);
        newEndDate.setDate(newEndDate.getDate() + 30);

        // Update the document in the Firestore collection with the new EndDate
        await updateDoc(clientDocRef, { EndDate: newEndDate });
        toast.success("Subscription renewed successfully");

        setIsModalRenewOpen(false);
        fetchClientData();
      } else {
        console.error("Client not found");
      }
    } catch (error) {
      toast.error("Error renewing subscription");
      console.error("Error renewing subscription:", error);
    }
  };


  const calculateTimeLeft = (endDate) => {
    if (endDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      const currentDate = new Date();
      const endDateObj = endDate.toDate();
      const timeDifference = endDateObj - currentDate;
      const daysDifference = Math.floor(timeDifference / oneDay);

      return daysDifference >= 0 ? `${daysDifference} days` : "Expired";
    }

    return "N/A";
  };

  const getCircleColor = (timeLeft) => {
    if (typeof timeLeft === "string") {
      const daysLeft = parseInt(timeLeft.split(" ")[0]);

      if (!isNaN(daysLeft)) {
        if (daysLeft > 10) {
          return "bg-green-500";
        } else if (daysLeft <= 10 && daysLeft > 0) {
          return "bg-yellow-500";
        }
      }
    }

    return "bg-red";
  };

  return (
    <div className="m-[1.5rem] flex justify-center items-center flex-col gap-[1.25rem] text-center relative">
      <div
        onClick={() => {
          navigate("/Client");
        }}
        className="absolute left-0 top-0 flex items-center text-red cursor-pointer"
      >
        <Icons.Back />
        back
      </div>
      {clientData ? (
        <>
          <div className="rounded-full w-[5rem] h-[5rem] bg-red flex justify-center items-center">
            <img
              src={Image}
              alt="profile"
              className="w-[4.5rem] h-[4.5rem] rounded-full"
            />
          </div>
          <div>
            <h1 className="text-[1.5rem]">
              {clientData.Name} {clientData.LastName}
            </h1>
            <h1 className="text-[1.2rem] text-red font-bold">
              {clientData.Type}
            </h1>
          </div>
          <div>
            <h1 className="text-red">From</h1>
            <h2>{clientData.StartDate?.toDate().toLocaleDateString()}</h2>
          </div>
          <div>
            <h1 className="text-red">To</h1>
            <h2>{clientData.EndDate?.toDate().toLocaleDateString()}</h2>
          </div>
          <div>
            <h1 className="text-red">Time Left</h1>
            <h2>
            <span
                    className={`w-3 h-3 rounded-full inline-block mr-2 ${getCircleColor(calculateTimeLeft(
                      clientData.EndDate
                    ))}`}
                  ></span>
              {calculateTimeLeft(clientData.EndDate)}{" "}
            </h2>
          </div>
          <div className="flex items-center gap-[1.25rem] mt-[1.25rem]">
            <div
              className="rounded-[0.25rem] bg-yellow-600 p-[0.25rem] text-white"
              onClick={() => setIsModalRenewOpen(true)}
            >
              <Icons.Renew />
            </div>
            <div
              className="rounded-[0.25rem] bg-green-600 p-[0.25rem] text-white"
              onClick={() => setIsModalUpdateOpen(true)}
            >
              <Icons.Edit />
            </div>
            <div
              className="rounded-[0.25rem] bg-red p-[0.25rem] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Icons.Delete />
            </div>
          </div>
<ToastContainer/>
          <PopUpDelete
            isOpen={isModalOpen}
            title="Delete Client"
            text="Are you sure you want to delete?"
            confirmText="Delete"
            bgColor="bg-red"
            onCancel={closeDeleteModal}
            onConfirm={handleDelete}
          />
     <PopUp
  isOpen={isModalRenewOpen}
  title="Renew Subscription"
  text="Are you sure you want to renew subscription (+30 Days)?"
  confirmText="Renew"
  bgColor="bg-yellow-600"
  onCancel={closeDeleteModal}
  onConfirm={handleRenew}  
/>

      <PopUpUpdate
  isOpen={isModalUpdateOpen}
  title="Update Client"
  text=""
  confirmText="Update"
  bgColor="bg-green-600"
  onCancel={closeDeleteModal}
handleUpdate={handleUpdate}
  initialData={clientData}
/>

        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
