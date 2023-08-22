import { useState } from "react";
import MovingCubic2 from "../Components/Render/MovingCubic2";
import Chat from "../Components/Chat/chat";

function Combine() {
  const [controls, setControls] = useState<any>(null);
  return (
    <div style={{ display: "flex" }}>
      <MovingCubic2 setControls={setControls} controls={controls} />
      <Chat />
    </div>
  );
}

export default Combine;
