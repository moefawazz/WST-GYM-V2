import React, {useState} from "react";
import Image from "../../assets/images/profile.webp";
import Icons from "../../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import PopUp from "../popUp/PopUp";
import PopUpUpdate from "../popUp/PopUpUpdate";

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalRenewOpen, setIsModalRenewOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setIsModalRenewOpen(false);
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
      <div className="rounded-full w-[5rem] h-[5rem] bg-red flex justify-center items-center">
        <img
          src={Image}
          alt="profile"
          className="w-[4.5rem] h-[4.5rem] rounded-full"
        />
      </div>
      <div>
        <h1 className="text-[1.5rem]">Abdelsalam Mahari</h1>
        <h1 className="text-[1.2rem] text-red font-bold">"Gym"</h1>
      </div>
      <div>
        <h1 className="text-red">From</h1>
        <h2>9/12/2023</h2>
      </div>
      <div>
        <h1 className="text-red">To</h1>
        <h2>9/1/2024</h2>
      </div>
      <div>
        <h1 className="text-red">Time Left</h1>
        <h2>29 Day</h2>
      </div>
      <div className="flex items-center gap-[1.25rem] mt-[1.25rem]">
        <div className="rounded-[0.25rem] bg-yellow-600 p-[0.25rem] text-white" onClick={() => setIsModalRenewOpen(true)}>
          <Icons.Renew />
        </div>
        <div className="rounded-[0.25rem] bg-green-600 p-[0.25rem] text-white" onClick={() => setIsModalUpdateOpen(true)}>
          <Icons.Edit />
        </div>
        <div className="rounded-[0.25rem] bg-red p-[0.25rem] text-white" onClick={() => setIsModalOpen(true)}>
          <Icons.Delete />
        </div>
      </div>

      <PopUp
        isOpen={isModalOpen}
        title='Delete Client'
        text='Are you sure you want to delete?'
        confirmText='Delete'
        bgColor='bg-red'
        onCancel={closeDeleteModal}
        onConfirm={closeDeleteModal}
      />
      <PopUp
        isOpen={isModalRenewOpen}
        title='Renew Subscription'
        text='Are you sure you want to renew subscription (+30 Days)?'
        confirmText='Renew'
        bgColor='bg-yellow-600'
        onCancel={closeDeleteModal}
        onConfirm={closeDeleteModal}
      />
      <PopUpUpdate
        isOpen={isModalUpdateOpen}
        title='Update Client'
        text=''
        confirmText='Update'
        bgColor='bg-green-600'
        onCancel={closeDeleteModal}
        onConfirm={closeDeleteModal}
      />
    </div>
  );
};

export default Profile;
