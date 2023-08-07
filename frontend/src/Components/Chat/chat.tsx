import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { messageState } from "../../States/ChatStates";
const ENDPOINT = "http://localhost:5000"; // env로 수정 필요함
const socket: Socket = io(ENDPOINT);

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useRecoilState(messageState);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");
    if (name && room) {
      setName(name);
      setRoom(room);

      if (socket) {
        socket.emit("join", { name, room }, () => {
          console.log(socket.id, "접속 완료");
        });
      }
    }

    // Clean up the socket connection on unmount
    return () => {
      socket.off();
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setChatList([...chatList, message]);
      });
    }
  }, [chatList]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    setMessage("");
  };

  const searchAllUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (socket) {
      socket.emit("searchUser");
    }
  };

  return (
    <div>
      Chat
      <div>유저 : {name}</div>
      <div>방제 : {room}</div>
      <button
        onClick={() => {
          setChatList([]);
        }}
      >
        대화 초기화
      </button>
      <div>
        {chatList.length > 0 &&
          chatList.map((a, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <div
                  style={{
                    border: "1px solid",
                    padding: "4px",
                    margin: "1px 4px",
                  }}
                >
                  {a.user}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  {a.text}
                </div>
              </div>
            );
          })}

        <button onClick={searchAllUser}>ㄱㅁㅇ</button>
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            style={{ border: "1px solid" }}
            value={message}
            onChange={(e) => {
              e.preventDefault();

              setMessage(e.target.value);
            }}
          />
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
