import React from 'react'
import HeaderPage from '../../components/headerPage/HeaderPage';
import InputFormPayment from '../../components/inputsForm/InputFormPayment';

const Payments = () => {
  return (
    <div className='min-h-screen'>
    <HeaderPage title="Payments"/>
    <InputFormPayment/>
    </div>
  )
}

export default Payments