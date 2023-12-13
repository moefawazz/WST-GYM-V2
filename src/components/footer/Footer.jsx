import React from "react";
import Logo from "../../assets/images/GymLogo.png";

const Footer = () => {
  return (
    <div className="bg-wblack text-white py-[1rem] px-[1.5rem] flex justify-between items-center">
      <div>
      <img src={Logo} alt={Logo} width="150rem"/>
      </div>
      <div>
        <h1 className="text-[1rem] cursor-pointer text-white">W<span className="text-orange font-semibold">.</span>S<span className="text-orange font-semibold">.</span>T</h1>
      </div>
    </div>
  );
};

export default Footer;
