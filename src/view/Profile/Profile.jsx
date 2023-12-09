import React from 'react'
import HeaderPage from '../../components/headerPage/HeaderPage';
import Profile from '../../components/profile/Profile';

const profile = () => {
  return (
    <div className='min-h-screen'>
    <HeaderPage title="Profile"/>
    <Profile/>
    </div>
  )
}

export default profile