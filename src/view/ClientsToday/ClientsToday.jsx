import React from "react";
import HeaderPage from "../../components/headerPage/HeaderPage";
import TodayClients from "../../components/ClientsToday/ClientsToday";

const ClientsToday = () => {
  return (
    <>
      <div className="min-h-screen">
        <HeaderPage title="Today Clients" />
        <TodayClients/>
      </div>
    </>
  );
};

export default ClientsToday;
