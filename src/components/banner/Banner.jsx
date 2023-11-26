import React from 'react'
import Image1 from '../../assets/images/Gym-amico 1.png'

const Banner = () => {
  return (
    <div className="flex justify-center items-center h-screen px-[5rem] flex-wrap border-b-2 border-red">
    <div className="flex-1 justify-center items-center">
      <h1 className="text-[3.5rem] leading-[4rem]">Zumba<br></br>and <span className="text-red">Gym</span></h1>
      <p className='mt-4 text-[1.25rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis </p>
    </div>
    <div className="flex-1 flex justify-center items-center">
      <img src={Image1} alt="banner" className='w-[30rem]'/>
    </div>
  </div>
  )
}

export default Banner