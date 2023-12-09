import React, { useState } from "react";
import Input from "../input/Input";
import SelectInput from "../selectInput/SelectInput";
import Button from "../button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputFormPayment = () => {
  const defaultFromDate = new Date().toISOString().split("T")[0]; // Today's date as the default "From" date
  const [formData, setFormData] = useState({
    itemName: "",
    amount: "",
    phoneNumber: "",
    date: defaultFromDate,
    price: "",
  });
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="container mx-auto mt-4">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-[1.5rem]">
        <div className="flex flex-col">
          <label>Item Name :</label>
          <Input
            type="text"
            placeholder="Enter Item Name"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            value={formData.itemName}
          />
        </div>

        <div className="flex flex-col">
          <label>amount ($) :</label>
          <Input
            type="number"
            placeholder="Please Enter Amount"
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            value={formData.amount}
          />
        </div>

        <div className="flex-1 flex-col">
          <label>Date :</label>
          <Input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => handleInputChange("fromDate", e.target.value)}
            width="w-full"
          />
        </div>

        <div className="flex-1 flex-col">
          <label>Price Per Item ($) :</label>
          <Input
            type="number"
            placeholder="Please Enter Price Per Item"
            value={formData.price}
            onChange={(e) => handleInputChange("toDate", e.target.value)}
            width="w-full"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-[2rem]">
        <Button title="Add Payment" onClick={()=>{}} />
      </div>
      <div className="my-[2rem]"></div>
    </div>
  );
};

export default InputFormPayment;
