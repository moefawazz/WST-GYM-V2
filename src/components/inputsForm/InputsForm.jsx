import React, { useState } from 'react';
import Input from '../input/Input';
import SelectInput from '../selectInput/SelectInput';
import Button from '../button/Button';
import Icons from '../../assets/icons/Icons';
import TableAddClient from '../table/TableAddClient';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '../../firebase';
import { collection, addDoc, getDoc } from '@firebase/firestore';

const InputsForm = () => {
  const defaultFromDate = new Date().toISOString().split('T')[0];
  const defaultToDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    PhoneNumber: '',
    Type: 'Select',
    StartDate: defaultFromDate,
    EndDate: defaultToDate,
    LastCame:'',
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  };
  const [clients, setClients] = useState([]);

  const profitCollectionRef = collection(db, "Profits");
console.log(profitCollectionRef)

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


  const handleAddClient = async (e) => {
    if (!formData.Name) {
      toast.error("First Name is mandatory!", {
        theme: "colored",
      });
    } else if (!formData.LastName) {
      toast.error("Last Name is mandatory!", {
        theme: "colored",
      });
    } else if (formData.Type === "Select") {
      toast.error("Please select an activity!", {
        theme: "colored",
      });
    } else {
      e.preventDefault();

      const newClient = { ...formData };

      try {
        newClient.StartDate = new Date(formData.StartDate);
        newClient.EndDate = new Date(formData.EndDate);
        newClient.LastCame = getCurrentDate();
        const docRef = await addDoc(collection(db, 'Clients'), newClient);
        console.log('Document written with ID: ', docRef.id);

        // Call the function to add a new document to the "Profit" collection
        await addProfitDocument(docRef.id, newClient.Type, newClient.StartDate);

        toast.success("Client Added successfully", {
          theme: "colored",
        });
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error("Error adding client. Please try again later.", {
          theme: "colored",
        });
      }

      setClients((prevClients) => [...prevClients, newClient]);
      setFormData({
        Name: '',
        LastName: '',
        PhoneNumber: '',
        Type: 'Select',
        StartDate: defaultFromDate,
        EndDate: defaultToDate,
        LastCame: '',
      });
    }
  };



  return (
    <div className="container mx-auto mt-4">
      <ToastContainer />
      <div className='flex justify-end mt-[1.5rem] mr-[1.5rem]'>
      <Icons.Down
          className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180 text-red' : ''}`}
          onClick={toggleCollapse}
        />
      </div>
      <div className={`${isCollapsed ? 'hidden' : ''}`}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-[1.5rem]'>
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>First Name :</label>
          <Input type="text" placeholder="Enter First Name" onChange={(e) => handleInputChange('Name', e.target.value)} value={formData.Name}/>
        </div>
        
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>Last Name :</label>
          <Input type="text" placeholder="Enter Last Name" onChange={(e) => handleInputChange('LastName', e.target.value)} value={formData.LastName}/>
        </div>
        
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>Phone Number :</label>
          <Input type="number" placeholder="Enter Phone Number" onChange={(e) => handleInputChange('PhoneNumber', e.target.value)} value={formData.PhoneNumber}/>
        </div>
        
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>Select Activity :</label>
          <SelectInput onChange={(value) => handleInputChange('Type', value)} value={formData.Type}/>
        </div>
        
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>From :</label>
          <Input type="date" placeholder="From" value={formData.StartDate} onChange={(e) => handleInputChange('StartDate', e.target.value)} width="w-full"/>
        </div>
        
        <div className='flex flex-col'>
          <label className='py-2 font-medium'>To :</label>
          <Input type="date" placeholder="To" value={formData.EndDate} onChange={(e) => handleInputChange('EndDate', e.target.value)} width="w-full"/>
        </div>

      </div>
      <div className='flex justify-center items-center my-[2rem]'>
        <Button title="Add New Client" onClick={handleAddClient}/>
      </div>      
      <hr></hr>
      </div>


      <div className="my-[2rem]">
        <TableAddClient />
      </div>
    </div>
  );
};

export default InputsForm;
