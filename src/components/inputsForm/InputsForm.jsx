import React, { useState } from 'react';
import Input from '../input/Input';
import SelectInput from '../selectInput/SelectInput';
import Button from '../button/Button';
import TableAddClient from '../table/TableAddClient';

const InputsForm = () => {
  const defaultFromDate = new Date().toISOString().split('T')[0]; // Today's date as the default "From" date
  const defaultToDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]; // One month from today as the default "To" date
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    activity: 'Select',
    fromDate: defaultFromDate,
    toDate: defaultToDate,
  });

  const [clients, setClients] = useState([]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleAddClient = (e) => {
    if(!formData.firstName || !formData.lastName || formData.activity === "Select"){
      console.log("these fields are mandatory")
    }else{
    e.preventDefault();
    console.log('Form Data:', formData);

    const newClient = { ...formData };
    setClients((prevClients) => [...prevClients, newClient]);
    

    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      activity: 'Select',
      fromDate: defaultFromDate,
      toDate: defaultToDate,
    });
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className='flex flex-col'>
          <label>First Name :</label>
          <Input type="text" placeholder="Enter First Name" onChange={(e) => handleInputChange('firstName', e.target.value)} value={formData.firstName}/>
        </div>
        
        <div className='flex flex-col'>
          <label>Last Name :</label>
          <Input type="text" placeholder="Enter Last Name" onChange={(e) => handleInputChange('lastName', e.target.value)} value={formData.lastName}/>
        </div>
        
        <div className='flex flex-col'>
          <label>Phone Number :</label>
          <Input type="number" placeholder="Enter Phone Number" onChange={(e) => handleInputChange('phoneNumber', e.target.value)} value={formData.phoneNumber}/>
        </div>
        
        <div className='flex flex-col'>
          <label>Select Activity :</label>
          <SelectInput onChange={(value) => handleInputChange('activity', value)} value={formData.activity}/>
        </div>
        
        <div className='flex flex-col'>
          <label>From :</label>
          <Input type="date" placeholder="From" value={formData.fromDate} onChange={(e) => handleInputChange('fromDate', e.target.value)}/>
        </div>
        
        <div className='flex flex-col'>
          <label>To :</label>
          <Input type="date" placeholder="To" value={formData.toDate} onChange={(e) => handleInputChange('toDate', e.target.value)}/>
        </div>
      </div>
      <div className='flex justify-center items-center mt-[2.5rem]'>
        <Button title="Add New Client" onClick={handleAddClient}/>
      </div>
      <div className="mt-4">
        <TableAddClient data={clients}/>
      </div>
    </div>
  );
};

export default InputsForm;
