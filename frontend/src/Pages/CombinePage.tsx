import React from "react";
import { Routes, Route } from "react-router-dom";
import MovingCubic2 from "../Components/Render/MovingCubic2";
import Chat from "../Components/Chat/chat";

function Combine() {
  return (
    <div style={{ display: "flex" }}>
      <MovingCubic2 />
      <Chat />
    </div>
  );
}

export default Combine;
