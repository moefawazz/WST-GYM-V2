import React from 'react'
import Cards from "../../components/card/Cards";
import Icons from "../../assets/icons/Icons";

const StatCard = () => {

  return (
    <div className="px-[1.5rem] py-[2.5rem] flex flex-col gap-[2rem] justify-center items-center flex-wrap">
    <h1 className="text-[1.5rem] font-semibold">Performance Overview</h1>
    <div className="flex flex-1 gap-[2rem] flex-wrap">
      <Cards text="Clients" count="25" icon={<Icons.Users/>}/>
      <Cards text="Payments" count="250" icon={<Icons.Credit/>}/>
    </div>
    <div className="flex flex-1 gap-[2rem] flex-wrap">
      <Cards text="Profits" count="300" icon={<Icons.Dollar/>}/>
      <Cards text="Today Clients" count="10" icon={<Icons.Today/>}/>
    </div>
  </div>
  )
}

export default StatCard