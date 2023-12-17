import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import SelectInput from "../selectInput/SelectInput";
import { ToastContainer, toast } from "react-toastify";

const PopUpPayment = ({ title, text, confirmText, bgColor, isOpen, onCancel, handleUpdate, initialData }) => {
  const { Name = '', LastName = '', PhoneNumber = '', Type = '', StartDate = null, EndDate = null } = initialData || {};
  
  const [firstName, setFirstName] = useState(Name);
  const [lastName, setLastName] = useState(LastName);
  const [phone, setPhone] = useState(PhoneNumber);
  const [activity, setActivity] = useState(Type);
  const [fromDate, setFromDate] = useState(StartDate ? StartDate.toDate().toISOString().split('T')[0] : '');
  const [toDate, setToDate] = useState(EndDate ? EndDate.toDate().toISOString().split('T')[0] : '');

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleActivityChange = (value) => setActivity(value);

  useEffect(() => {
    setFirstName(Name);
    setLastName(LastName);
    setPhone(PhoneNumber);
    setActivity(Type);
    setFromDate(StartDate ? StartDate.toDate().toISOString().split('T')[0] : '');
    setToDate(EndDate ? EndDate.toDate().toISOString().split('T')[0] : '');
  }, [isOpen, initialData]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    const updatedData = {
      Name: firstName,
      LastName: lastName,
      PhoneNumber: phone,
      Type: activity,
      StartDate: new Date(fromDate),
      EndDate: new Date(toDate),
    };

    handleUpdate(updatedData);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen py-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-[1rem] px-4 pt-5 pb-5 mx-[1.5rem] w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{text}</p>
            </div>
          </div>
          <div>
            <div className='flex flex-col'>
              <label className='py-2 font-medium'>Item Name :</label>
              <Input type="text" placeholder="Enter Item Name" value={firstName} onChange={handleFirstNameChange} />
            </div>

            <div className='flex flex-col'>
              <label className='py-2 font-medium'>Quantity :</label>
              <Input type="text" placeholder="Enter Quantity" value={lastName} onChange={handleLastNameChange} />
            </div>

            <div className='flex flex-col'>
              <label className='py-2 font-medium'>Price Per Item ($) :</label>
              <Input type="number" placeholder="Enter Price Per Item" value={phone} onChange={handlePhoneChange} />
            </div>

            <div className='flex flex-col'>
              <label className='py-2 font-medium'>Date :</label>
              <Input type="date" placeholder="Enter Date" width="w-full" value={activity} onChange={handleActivityChange} />
            </div>

          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={handleConfirm}
              type="button"
              className={`inline-flex justify-center w-full rounded-md border bg-orange-600 shadow-sm px-4 py-2 text-base font-medium text-white ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpPayment;
