import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <div>
        <h1>입장</h1>
        <div>
          <input
            placeholder="user-name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="server-name"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit">sign in</button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
