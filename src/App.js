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
import Footer from "./components/footer/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import Qrcode1 from "./view/QrCode/Qrcode1";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/QrCode" element={<Qrcode />} />
          <Route path="/QrCode1" element={<Qrcode1 />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/profits" element={<Profits />} />
          <Route path={`/profile/:id`} element={<Profile />} />
        </Routes>
      </AuthContextProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
