import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function Chat({ location }: any) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000"; // env로 수정 필요함

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // const name = searchParams.get("name");
    // const room = searchParams.get("room");
    console.log(name, room);
    let socket = io(ENDPOINT);
    console.log(io());
    // if (name && room) {
    //   setName(name);
    //   setRoom(room);

    //   socket.emit("join", { name, room });
    // }

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [
    ENDPOINT,
    // location.search
  ]);

  return <div>Chat</div>;
}

export default Chat;
