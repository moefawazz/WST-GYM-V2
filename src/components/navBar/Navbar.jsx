import React, { useRef, useState, useEffect } from "react";
import Icons from '../../assets/icons/Icons';
import PopUp from '../popUp/PopUp';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header className='bg-wblack text-white py-[1rem] px-[1.5rem] flex justify-between fixed items-center w-screen z-40'>
        <div>
          <h1 className='text-[1.5rem] cursor-pointer'><Link to="/" onClick={() => handleLinkClick('/')}>WST<span className="text-red font-semibold">GYM</span></Link></h1>
        </div>
        <nav className="flex gap-[3rem]" ref={navRef}>
            <Link to='/Client' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Client' && 'bg-red'}`} onClick={() => {handleLinkClick('/Client'); showNavbar(); scrollToTop()}}>
              Clients
            </Link>
            <Link to='/Payments' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/Payments' && 'bg-red'}`} onClick={() => {handleLinkClick('/Payments'); showNavbar(); scrollToTop()}}>
              Payments
            </Link>
            <Link to='/profits' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/profits' && 'bg-red'}`} onClick={() => {handleLinkClick('/profits'); showNavbar(); scrollToTop()}}>
              Profits
            </Link>
            <Link to='/QrCode' className={`hover:bg-red2 rounded-[4rem] px-[1rem] py-[0.5rem] ${activeLink === '/QrCode' && 'bg-red'}`} onClick={() => {handleLinkClick('/QrCode'); showNavbar(); scrollToTop()}}>
              QrScanner
            </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <Icons.Close className="text-red text-[2.5rem]"/>
          </button>
        </nav>
        <div className="flex gap-1 items-center">
          {/* <Icons.Bell className='text-white w-[2rem] h-[1.25rem] cursor-pointer' /> */}
        <button className="nav-btn" onClick={showNavbar}>
          <Icons.Bars className="text-red" />
        </button>
        </div>
      </header>

    </>
  );
};

export default Navbar;
