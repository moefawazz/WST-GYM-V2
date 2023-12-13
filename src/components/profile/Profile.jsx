import React, { useState, useEffect } from "react";
import Image from "../../assets/images/profile.webp";
import Icons from "../../assets/icons/Icons";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "../popUp/PopUp";
import PopUpUpdate from "../popUp/PopUpUpdate";
import PopUpDelete from "../popUp/PopUpDelete";
import PopUpQrCode from "../popUp/QrCodePopUp";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc,collection,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Button from "../button/Button";
const Profile = () => {
  const navigate = useNavigate();
  const [isQrModalOpen, setisQrModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalRenewOpen, setIsModalRenewOpen] = useState(false);
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalRenewOpen(false);
    setisQrModalOpen(false);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
  const handleAddCame = async () => {
    try {
      // Fetch the client document
      const clientDocRef = doc(db, "Clients", id);
      const clientDoc = await getDoc(clientDocRef);

      if (clientDoc.exists()) {
        const currentDate = getCurrentDate();
        const lastCame = clientDoc.data().LastCame;

        if (lastCame === currentDate) {
          toast.error("Client already came today", {
            theme: "colored",
          });
        } else {
          await updateDoc(clientDocRef, { LastCame: currentDate });
          toast.success("Client came today", {
            theme: "colored",
          });

          fetchClientData();
        }
      } else {
        console.error("Client not found");
      }
    } catch (error) {
      toast.error("Error updating LastCame", {
        theme: "colored",
      });
      console.error("Error updating LastCame:", error);
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
  const addProfitDocument = async (clientId, clientType, startDate) => {
    console.log("hi")
    try {
      const profitCollectionRef = collection(db, "Profits");
console.log("profits",profitCollectionRef)
      await addDoc(profitCollectionRef, {
        clientId,
        clientType,
        startDate,
      
      });

      console.log("Document added to Profit collection successfully!");
    } catch (error) {
      console.error("Error adding document to Profit collection:", error);
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

        await addProfitDocument(id, clientData.Type, clientData.StartDate);


        toast.success("Subscription renewed successfully", {
          theme: "colored",
        });

        setIsModalRenewOpen(false);
        fetchClientData();
      } else {
        console.error("Client not found");
      }
    } catch (error) {
      toast.error("Error renewing subscription", {
        theme: "colored",
      });
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

    return "bg-orange";
  };




  return (
    <div className="m-[1.5rem] flex justify-center items-center flex-col gap-[1.25rem] text-center relative">
      <div
        onClick={() => {
          navigate("/Client");
        }}
        className="absolute left-0 top-0 flex items-center text-orange cursor-pointer"
      >
        <Icons.Back />
        back
      </div>
      {clientData ? (
        <>
          <div className="rounded-full w-[5rem] h-[5rem] bg-orange flex justify-center items-center">
            <img
              src={Image}
              alt="profile"
              className="w-[4.5rem] h-[4.5rem] rounded-full"
            />
          </div>
          <Button title="Came today" onClick={handleAddCame}  />
          <div>
            <h1 className="text-[1.5rem]">
              {clientData.Name} {clientData.LastName}
            </h1>
            <h1 className="text-[1.2rem] text-orange font-bold">
              {clientData.Type}
            </h1>
          </div>
          <div>
            <h1 className="text-orange">From</h1>
            <h2>{clientData.StartDate?.toDate().toLocaleDateString()}</h2>
          </div>
          <div>
            <h1 className="text-orange">To</h1>
            <h2>{clientData.EndDate?.toDate().toLocaleDateString()}</h2>
          </div>
          <div>
            <h1 className="text-orange">Time Left</h1>
            <h2>
              <span
                className={`w-3 h-3 rounded-full inline-block mr-2 ${getCircleColor(
                  calculateTimeLeft(clientData.EndDate)
                )}`}
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
              className="rounded-[0.25rem] bg-red-600 p-[0.25rem] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Icons.Delete />
            </div>
            <div
              className="rounded-[0.25rem] bg-orange p-[0.25rem] text-white"
              onClick={() => setisQrModalOpen(true)}
            >
              <Icons.QrCode />
            </div>
          </div>
          <ToastContainer />
          <PopUpDelete
            isOpen={isModalOpen}
            title="Delete Client"
            text="Are you sure you want to delete?"
            confirmText="Delete"
            bgColor="bg-red-600"
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
          <PopUpQrCode
            isOpen={isQrModalOpen}
            title="QrCode"
            bgColor="bg-orange"
            onCancel={closeDeleteModal}
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
