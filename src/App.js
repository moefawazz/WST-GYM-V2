import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";
import "./index.css";

import Home from "./view/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
