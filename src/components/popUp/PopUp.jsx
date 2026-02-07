import React, { useState } from "react";
import Input from "../input/Input";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PopUp = ({
  title,
  text,
  confirmText,
  bgColor,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const calculateEndDate = (startDate, daysToAdd) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const defaultStartDate = getCurrentDate();
  const defaultEndDate = calculateEndDate(defaultStartDate, 30);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [payment, setPayment] = useState("");

  const handleConfirm = () => {
    onConfirm(startDate, endDate, payment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
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
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{text}</p>
          </div>

          <div className="mt-4">
            <div className="flex flex-col">
              <label className="py-2 font-medium">From :</label>
              <Input
                type="date"
                placeholder="From"
                width="w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="py-2 font-medium">To :</label>
              <Input
                type="date"
                placeholder="To"
                width="w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* ✅ NEW Payment field */}
            <div className="flex flex-col">
              <label className="py-2 font-medium">Payment :</label>
              <Input
                type="number"
                placeholder="Payment"
                width="w-full"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
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

export default PopUp;
