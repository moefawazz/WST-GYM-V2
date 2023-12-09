import React from 'react'
import HeaderPage from '../../components/headerPage/HeaderPage';
import InputsForm from '../../components/inputsForm/InputsForm';

const Client = () => {
  return (
    <div className='min-h-screen'>
    <HeaderPage title="Add Clients"/>
    <InputsForm/>
    </div>
  )
}

export default Client