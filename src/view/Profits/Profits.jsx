import React from "react";
import HeaderPage from "../../components/headerPage/HeaderPage";
import ProfitsPage from "../../components/ProfitsPage/ProfitsPage";

const Profits = () => {
  return (
    <>
      <div className="min-h-screen">
        <HeaderPage title="Profits" />
        <ProfitsPage/>
      </div>
    </>
  );
};

export default Profits;
