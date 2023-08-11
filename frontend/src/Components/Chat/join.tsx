import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginModeState } from "../../States/ChatStates";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useRecoilState(loginModeState);
  let dir = "";
  let goto = "";
  if (window.location.pathname === "/join") {
    dir = `/chat?name=${name}&room=${room}`;
    setMode("chat");
    goto = "Websoket 채팅방";
  } else {
    dir = `./gomgom?name=${name}&room=${room}`;
    setMode("3d");
    goto = "3D Render 채팅방";
  }

  return (
    <div>
      <div>
        <div>현재 목적지 : {goto}</div>
        <h1>입장</h1>
        <div>
          <input
            placeholder="server-name"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="user-name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={dir}
        >
          <button type="submit">sign in</button>
        </Link>
      </div>
      <Link to="/">메인 페이지로</Link>
    </div>
  );
}

export default Join;
