import React, {useState} from 'react'
import Icons from '../../assets/icons/Icons'
import PopUp from '../popUp/PopUp'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className='bg-wblack text-white py-[1rem] px-[5rem] flex justify-between items-center fixed w-screen'>
      <div>
        <h1 className='text-[2rem] cursor-pointer'><Link to="/">LOGO</Link></h1>
      </div>
      <div>
          <ul className='flex gap-[3rem]'>
            <li className='hover:bg-red  rounded-[4rem] px-[1rem] py-[0.5rem]'><Link to='/Client'>Client</Link></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><Link to='/Payments'>Payments</Link></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><Link to='/profits'>Profits</Link></li>
            <li className='hover:bg-red rounded-[4rem] px-[1rem] py-[0.5rem]'><Link to='/QrCode'>QrScanner</Link></li>
          </ul>
      </div>
      <div>
        <Icons.Bell className='text-red w-[2rem] h-[1.25rem] cursor-pointer' onClick={setIsModalOpen}/>
      </div>
    </div>

    <PopUp
      isOpen={isModalOpen}
      title='Delete Client'
      text='Are you sure you want to delete?'
      confirmText='Delete'
      bgColor='bg-red'
      onCancel={closeDeleteModal}
      onConfirm={closeDeleteModal}
    />
    </>
  )
}

export default Navbar