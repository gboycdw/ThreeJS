import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginModeState } from "../../States/ChatStates";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useRecoilState(loginModeState);
  const [goto, setGoto] = useState("");
  const [dir, setDir] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/join") {
      setMode("chat");
      setGoto("Websoket 채팅방");
    } else {
      setMode("3d");
      setGoto("3D Render 채팅방");
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/join") {
      setDir(`/chat?name=${name}&room=${room}`);
    } else {
      setDir(`./gomgom?name=${name}&room=${room}`);
    }
  }, [name, room]);

  return (
    <div className="m-40 grid ">
      <div className="justify-self-center">
        <div>현재 목적지 : {goto}</div>
        <h1>입장</h1>
        <div>
          <input
            placeholder="server-name"
            className="border-2"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="user-name"
            className="border-2"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={dir}
        >
          <button className="border-2 bg-slate-200" type="submit">
            sign in
          </button>
        </Link>
      </div>
      <Link className="border-2 w-fit justify-self-center" to="/">
        메인 페이지로
      </Link>
    </div>
  );
}

export default Join;
