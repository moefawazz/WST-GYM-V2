import React, { useRef, useState, useEffect } from "react";
import Icons from "../../assets/icons/Icons";
import PopUp from "../popUp/PopUp";
import Logo from "../../assets/images/GymLogo.png";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const navRef = useRef();
  const [user, setUser] = useState(null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleSignout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);

      setUser(null);
      showNavbar();
      scrollToTop();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="bg-wblack text-white py-[1rem] px-[1.5rem] flex justify-between fixed items-center w-screen z-40">
        <div>
            <Link to="/home" onClick={() => handleLinkClick("/")}>
              <img src={Logo} alt={Logo} width="120rem"/>
            </Link>
        </div>
        <nav className="flex gap-[3rem]" ref={navRef}>
          <Link
            to="/Client"
            className={`hover:bg-orange2 rounded-[4rem] px-[1rem] py-[0.5rem] ${
              activeLink === "/Client" && "bg-orange"
            }`}
            onClick={() => {
              handleLinkClick("/Client");
              showNavbar();
              scrollToTop();
            }}
          >
            Clients
          </Link>
          <Link
            to="/Payments"
            className={`hover:bg-orange2 rounded-[4rem] px-[1rem] py-[0.5rem] ${
              activeLink === "/Payments" && "bg-orange"
            }`}
            onClick={() => {
              handleLinkClick("/Payments");
              showNavbar();
              scrollToTop();
            }}
          >
            Payments
          </Link>
          <Link
            to="/profits"
            className={`hover:bg-orange2 rounded-[4rem] px-[1rem] py-[0.5rem] ${
              activeLink === "/profits" && "bg-orange"
            }`}
            onClick={() => {
              handleLinkClick("/profits");
              showNavbar();
              scrollToTop();
            }}
          >
            Profits
          </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <Icons.Close className="text-orange text-[2.5rem]" />
          </button>
          <button className="text-red-600" onClick={handleSignout}>Sign Out</button>
        </nav>
        <div className="flex gap-1 items-center">
          {/* <Icons.Bell className='text-white w-[2rem] h-[1.25rem] cursor-pointer' /> */}
          <button className="nav-btn" onClick={showNavbar}>
            <Icons.Bars className="text-orange" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
