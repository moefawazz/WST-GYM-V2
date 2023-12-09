import React from 'react'
import Image from "../../assets/images/profile.webp"

const Profile = () => {
  return (
    <div className='m-[1.5rem] flex justify-center items-center flex-col gap-[1.25rem] text-center'>
      <div className='rounded-full w-[5rem] h-[5rem] bg-red flex justify-center items-center'>
        <img src={Image} alt='profile' className='w-[4.5rem] h-[4.5rem] rounded-full'/>
      </div>
      <div>
        <h1 className='text-[1.5rem]'>Abdelsalam Mahari</h1>
        <h1 className='text-[1.2rem] text-red font-bold'>"Gym"</h1>
      </div>
      <div>
        <h1 className='text-red'>From</h1>
        <h2>9/12/2023</h2>
      </div>
      <div>
        <h1 className='text-red'>To</h1>
        <h2>9/1/2024</h2>
      </div>
    </div>
  )
}

export default Profile