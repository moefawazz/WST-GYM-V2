import React from 'react'
import Icons from '../../assets/icons/Icons'

const Navbar = () => {
  return (
    <div className='bg-wblack text-white py-[1rem] px-[5rem] flex justify-between items-center fixed w-screen'>
      <div>
        <h1 className='text-[2rem] cursor-pointer'>LOGO</h1>
      </div>
      <div>
          <ul className='flex gap-[3rem]'>
            <li className='hover:bg-red  rounded-[4rem] px-[1rem] py-[0.5rem]'><a href='/'>Client</a></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><a href='/'>Payments</a></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><a href='/'>Profits</a></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><a href='/'>QrScanner</a></li>
          </ul>
      </div>
      <div>
        <Icons.Bell className='text-red w-[2rem] h-[1.25rem] cursor-pointer'/>
      </div>
    </div>
  )
}

export default Navbar