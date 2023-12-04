import React, { useState } from 'react';
import Icons from '../../assets/icons/Icons';
import PopUp from '../popUp/PopUp';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className='bg-wblack text-white py-[1rem] px-[5rem] flex justify-between fixed items-center w-screen'>
        <div>
          <h1 className='text-[2rem] cursor-pointer'><Link to="/" onClick={() => handleLinkClick('/')}>LOGO</Link></h1>
        </div>
        <div>
          <ul className='flex gap-[3rem]'>
            <li className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Client' && 'bg-red'}`}>
              <Link to='/Client' onClick={() => handleLinkClick('/Client')}>Client</Link>
            </li>
            <li className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Payments' && 'bg-red'}`}>
              <Link to='/Payments' onClick={() => handleLinkClick('/Payments')}>Payments</Link>
            </li>
            <li className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/profits' && 'bg-red'}`}>
              <Link to='/profits' onClick={() => handleLinkClick('/profits')}>Profits</Link>
            </li>
            <li className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/QrCode' && 'bg-red'}`}>
              <Link to='/QrCode' onClick={() => handleLinkClick('/QrCode')}>QrScanner</Link>
            </li>
          </ul>
        </div>
        <div>
          <Icons.Bell className='text-red w-[2rem] h-[1.25rem] cursor-pointer' onClick={() => setIsModalOpen(true)} />
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
  );
};

export default Navbar;
