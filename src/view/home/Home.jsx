import React from "react";
import Navbar from "../../components/navBar/Navbar";
import Banner from "../../components/banner/Banner";
import Cards from "../../components/card/Cards";
import Icons from "../../assets/icons/Icons";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="px-[5rem] py-[2.5rem] flex flex-col gap-[3rem] justify-center items-center flex-wrap">
        <h1 className="text-[3rem]">Payment Overview</h1>
        <div className="flex flex-1 gap-[2rem] flex-wrap">
          <Cards text="Clients" count="25" icon={<Icons.Users/>}/>
          <Cards text="Payments" count="250" icon={<Icons.Credit/>}/>
        </div>
        <div className="flex flex-1 gap-[2rem] flex-wrap">
          <Cards text="Profits" count="300" icon={<Icons.Dollar/>}/>
          <Cards text="Today Clients" count="10" icon={<Icons.Today/>}/>
        </div>
      </div>
    </>
  );
};

export default Home;
