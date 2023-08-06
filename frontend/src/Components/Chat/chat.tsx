import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000"; // env로 수정 필요함

  useEffect(() => {
    let socket = io(ENDPOINT);

    console.log("연결됨?", socket);

    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");

    if (name && room) {
      setName(name);
      setRoom(room);

      socket.emit("join", { name, room });
    }

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
      socket.emit("disconnent");
      socket.off();
    };
  }, [ENDPOINT]);

  return (
    <div>
      Chat
      <div>유저 : {name}</div>
      <div>방제 : {room}</div>
    </div>
  );
}

export default Chat;
