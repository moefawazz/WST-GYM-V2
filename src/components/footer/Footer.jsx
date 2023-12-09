import React from "react";

const Footer = () => {
  return (
    <div className="bg-wblack text-white py-[1rem] px-[1.5rem] flex justify-between items-center">
      <div>
        <h1 className="text-[2rem] cursor-pointer">WST<span className="text-red font-semibold">GYM</span></h1>
      </div>
      <div>
        <h1 className="text-[1rem] cursor-pointer text-white">Zumba <span className="text-red font-semibold">&</span> Gym</h1>
      </div>
    </div>
  );
};

export default Footer;
