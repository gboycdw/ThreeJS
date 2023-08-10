import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  let dir = "";
  let goto = "";
  if (window.location.pathname === "/join") {
    dir = `/chat?name=${name}&room=${room}`;
    goto = "Websoket 채팅방";
  } else {
    dir = `./gomgom?name=${name}&room=${room}`;
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
    </div>
  );
}

export default Join;
