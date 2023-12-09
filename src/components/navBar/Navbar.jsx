import React, { useRef, useState, useEffect } from "react";
import Icons from '../../assets/icons/Icons';
import PopUp from '../popUp/PopUp';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef();

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header className='bg-wblack text-white py-[1rem] px-[1.5rem] flex justify-between fixed items-center w-screen'>
        <div>
          <h1 className='text-[1.5rem] cursor-pointer'><Link to="/" onClick={() => handleLinkClick('/')}>LOGO</Link></h1>
        </div>
        <nav className="flex gap-[3rem]" ref={navRef}>
            <Link to='/Client' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Client' && 'bg-red'}`} onClick={() => {handleLinkClick('/Client'); showNavbar()}}>
              Clients
            </Link>
            <Link to='/Payments' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Payments' && 'bg-red'}`} onClick={() => {handleLinkClick('/Payments'); showNavbar()}}>
              Payments
            </Link>
            <Link to='/profits' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/profits' && 'bg-red'}`} onClick={() => {handleLinkClick('/profits'); showNavbar()}}>
              Profits
            </Link>
            <Link to='/QrCode' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/QrCode' && 'bg-red'}`} onClick={() => {handleLinkClick('/QrCode'); showNavbar()}}>
              QrScanner
            </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <Icons.Close className="text-red text-[2.5rem]"/>
          </button>
        </nav>
        <div>
          <Icons.Bell className='text-red w-[2rem] h-[1.25rem] cursor-pointer' onClick={() => setIsModalOpen(true)} />
        </div>
        <button className="nav-btn" onClick={showNavbar}>
          <Icons.Bars className="text-red" />
        </button>
      </header>

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
