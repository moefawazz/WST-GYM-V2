import React, { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import TableAddPayment from "../table/TableAddPayment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const InputFormPayment = () => {
  const defaultFromDate = new Date().toISOString().split('T')[0]; 
  const [formData, setFormData] = useState({
    itemName: "",
    amount: "",
    date: defaultFromDate,
    pricePerItem: "",
    totalPrice: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };


  const calculateTotalPrice = () => {
    const { amount, pricePerItem } = formData;
    if (amount && pricePerItem) {
      return amount * pricePerItem;
    }
    return 0;
  };

  const handleAddPayment = async () => {
    if (!formData.itemName) {
      toast.error("Item Name is mandatory!", {
        theme: "colored",
      });
    } else if (!formData.amount) {
      toast.error("Quantity is mandatory!", {
        theme: "colored",
      });
    } else if (!formData.pricePerItem) {
      toast.error("Price Per Item is mandatory!", {
        theme: "colored",
      });
    } else {
    try {

      const updatedFormData = {
        ...formData,
        totalPrice: calculateTotalPrice().toString(), 
      };

      const docRef = await addDoc(collection(db, 'Payments'), updatedFormData);
      console.log('Document written with ID: ', docRef.id);
      toast.success("Payment added successfully!");
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error("Error adding payment. Please try again later.", {
        theme: "colored",
      });
    }
    }


    setFormData({
      itemName: "",
      amount: "",
      date: defaultFromDate,
      pricePerItem: "",
      totalPrice: "",
    });
  };

  return (
    <div className="container mx-auto mt-4">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-[1.5rem]">
        <div className="flex flex-col">
          <label className='py-2 font-medium'>Item Name :</label>
          <Input
            type="text"
            placeholder="Enter Item Name"
            onChange={(e) => handleInputChange("itemName", e.target.value)}
            value={formData.itemName}
          />
        </div>

        <div className="flex flex-col">
          <label className='py-2 font-medium'>Quantity :</label>
          <Input
            type="number"
            placeholder="Please Enter Quantity"
            onChange={(e) => handleInputChange("amount", e.target.value)}
            value={formData.amount}
          />
        </div>
        <div className="flex flex-col">
          <label className='py-2 font-medium'>Price Per Item ($) :</label>
          <Input
            type="number"
            placeholder="Please Enter Price Per Item"
            value={formData.pricePerItem}
            onChange={(e) => handleInputChange("pricePerItem", e.target.value)}
            width="w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className='py-2 font-medium'>Date :</label>
          <Input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            width="w-full"
          />
        </div>

      </div>

      <div className="flex justify-center items-center my-[2rem]">
        <Button title="Add Payment" onClick={handleAddPayment} />
      </div>
      <hr></hr>

      <div className="my-[2rem]">
        <TableAddPayment />
      </div>
    </div>
  );
};

export default InputFormPayment;
