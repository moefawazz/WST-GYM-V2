import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";
import "./index.css";

import Home from "./view/home/Home";
import Client from "./view/ClientView/Client";
import Qrcode from "./view/QrCode/Qrcode";
import Payments from "./view/Payments/Payments";
import Profits from "./view/Profits/Profits";
import Navbar from "./components/navBar/Navbar";
import Signin from "./view/Signup-Signin/Signin";
import Signup from "./view/Signup-Signin/Signup";
import Profile from "./view/Profile/Profile";
import ClientsToday from "./view/ClientsToday/ClientsToday";
import Footer from "./components/footer/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import Qrcode1 from "./view/QrCode/Qrcode1";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthContextProvider>
        <Routes>
          <Route path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route index element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Client" element={<ProtectedRoute><Client /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="/profits" element={<ProtectedRoute><Profits /></ProtectedRoute>} />
          <Route path="/clientsToday" element={<ProtectedRoute><ClientsToday /></ProtectedRoute>} />
          <Route path={`/profile/:id`} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
