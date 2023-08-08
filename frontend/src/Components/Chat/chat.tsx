import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { messageState } from "../../States/ChatStates";
import { MyChat } from "../Common/chatBox";
import styled from "styled-components";

const ENDPOINT = "http://localhost:5000"; // env로 수정 필요함
let socket: Socket = io(ENDPOINT);

function Chat() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useRecoilState(messageState);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");
    if (name && room) {
      setName(name);
      setRoom(room);

      socket.emit("join", { name, room }, (error: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log("ㄱㅁㅇ");
        }
      });
    }

    // Clean up the socket connection on unmount
    return () => {
      socket.off();
    };
  }, [ENDPOINT]);

  const scrollControl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("message", (message) => {
      setChatList([...chatList, message]);
    });
    const scroll = scrollControl.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [chatList]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", name, message, () => setMessage(""));
    }
    setMessage("");
  };

  const leaveRoom = () => {
    socket.emit("quit", name);
    navigate("/join");
  };

  // 변경은 가능. 그런데 검증은 어떻게?
  const changeName = () => {
    socket.emit("change", name, newName, () => {
      console.log("닉변성공");
    });
    // 변경 검증 로직 추가

    setName(newName);
  };

  return (
    <div>
      Chat
      <div>방제 : {room}</div>
      <div>유저 : {name}</div>
      <div>
        닉네임 변경
        <input
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button onClick={changeName}>변경</button>
      </div>
      <button
        onClick={() => {
          setChatList([]);
        }}
      >
        대화 초기화
      </button>{" "}
      <br />
      <button
        onClick={() => {
          console.log(chatList);
        }}
      >
        채팅 리스트 타입확인
      </button>
      <button onClick={leaveRoom}>채팅방 떠나기</button>
      {/* 채팅방 구현 */}
      <StyledChatContainer>
        <StyledChatBox ref={scrollControl}>
          <MyChat chatList={chatList} name={name} />
        </StyledChatBox>
        <StyledInputContainer>
          <form onSubmit={sendMessage}>
            <StyledInputBox
              value={message}
              onChange={(e) => {
                e.preventDefault();

                setMessage(e.target.value);
              }}
            />
            <button type="submit">제출</button>
          </form>
        </StyledInputContainer>
      </StyledChatContainer>
    </div>
  );
}

export default Chat;

const StyledChatContainer = styled.div`
  width: 30.5rem;
  padding: 10px;
`;

const StyledChatBox = styled.div`
  padding: 12px;
  margin: 5.5px;
  border-radius: 2px;
  border: 1px solid black;
  width: fit-content;
  overflow-y: scroll;
  background-color: rgb(240, 240, 240);
`;

const StyledInputContainer = styled.div`
  background-color: skyblue;
  display: grid;
  padding: 7px;
  align-items: center;
  align-self: center;
`;

const StyledInputBox = styled.input`
  width: 85%;
  height: 25px;
  margin-right: 7px;
  border: 1px solid;
`;
