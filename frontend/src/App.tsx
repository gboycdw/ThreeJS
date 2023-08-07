import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Styles.css";
import MainPage from "./Pages/MainPage";
import MovingCubic from "./Pages/MovingCubic";
import MovingCubic2 from "./Pages/MovingCubic2";
import Chat from "./Components/Chat/chat";
import Join from "./Components/Chat/join";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/test1" element={<MovingCubic />} />
          <Route path="/test2" element={<MovingCubic2 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
