import React from 'react'
import HeaderPage from '../../components/headerPage/HeaderPage';
import PaymentEdit from '../../components/paymentEdit/PaymentEdit';

const PaymentsEdit = () => {
  return (
    <div className='min-h-screen'>
    <HeaderPage title="Edit Payment"/>
    <PaymentEdit/>
    </div>
  )
}

export default PaymentsEdit