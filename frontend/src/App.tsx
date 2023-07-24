import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Styles.css";
import MainPage from "./Pages/MainPage";
import MovingCubic from "./Pages/MovingCubic";
import MovingCubic2 from "./Pages/MovingCubic2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test1" element={<MovingCubic />} />
        <Route path="/test2" element={<MovingCubic2 />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
