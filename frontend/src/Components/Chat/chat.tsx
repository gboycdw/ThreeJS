import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import {
  loginModeState,
  messageState,
  serverMessageState,
} from "../../States/ChatStates";
import { useNavigate } from "react-router-dom";
import { MyChat } from "../Common/chatBox";
import styled from "styled-components";

export interface User {
  id: string;
  name: string;
  room: string;
}

const def = [
  "/오른쪽",
  "/왼쪽",
  "/뒤로",
  "/앞으로",
  "/멈춰",
  "/제자리로",
  "/우로돌아",
  "/좌로돌아",
];

const ENDPOINT = "http://localhost:5000"; // env로 수정 필요함
let socket: Socket = io(ENDPOINT);

function Chat() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setId] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useRecoilState(messageState);
  const [mode] = useRecoilState(loginModeState);
  const [serverMsg, setServerMsg] = useRecoilState(serverMessageState);

  let backUrl = "";
  let changeUrl = "";
  if (mode === "chat") {
    backUrl = "/join";
    changeUrl = `/chat?name=${newName}&room=${room}`;
  } else if (mode === "3d") {
    backUrl = "/gomao";
    changeUrl = `./gomgom?name=${newName}&room=${room}`;
  }
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");
    console.log("접속시도, 닉네임", name);
    if (name && room) {
      setName(name);
      setRoom(room);
      socket.on("connect", () => {
        setId([...id, socket.id]);
      });
      socket.emit("join", { name, room }, (error: string) => {
        if (error) {
          console.log("에러사유", error);
          navigate(backUrl);
        } else {
          console.log("접속성공");
        }
      });
    }
    // Clean up the socket connection on unmount
    return () => {
      socket.off();
      setServerMsg("");
    };
  }, []);

  const scrollControl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("message", (message) => {
      if (def.includes(message.text)) {
        // console.log("명령받음", message.text);
        setServerMsg(message.text);
      }

      setChatList([...chatList, message]);
    });
    const scroll = scrollControl.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [chatList]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", name, message, () => setMessage(""));
    }
    setMessage("");
  };

  const leaveRoom = () => {
    socket.emit("quit", name);
    navigate(backUrl);
  };

  // 변경은 가능. 그런데 검증은 어떻게?
  const changeName = () => {
    socket.emit("change", name, newName, (error: string) => {
      if (error) {
        setName(name);
        alert("닉네임 중복 - 닉변실패");
      } else {
        setName(newName);
        navigate(changeUrl, { replace: true });
        console.log("닉변성공");
      }
    });
    // 변경 검증 로직 추가
  };

  return (
    <div>
      Chat
      <div>방제 : {room}</div>
      <div>유저 : {name}</div>
      <div>최근명령 : {serverMsg}</div>
      <button
        onClick={() => {
          console.log("현재아이디", socket.id);
          console.log("내아이디", id);
        }}
      >
        체크용버튼
      </button>
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
