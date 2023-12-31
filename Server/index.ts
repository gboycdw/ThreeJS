import { app, server } from "./src/app";
import { Server as SocketIOServer } from "socket.io";

import { addUser, removeUser, getUser, changeUserName, User } from "./src/user";

// Server On
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// Websoket
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});

// socket function
io.on("connection", (socket) => {
  const nowUser = { name: "", room: "" };

  socket.on("join", ({ name, room }, cb) => {
    console.log("클라이언트가 들어옴", `room : ${room}, name: ${name}`);
    const { error, user } = addUser({ id: socket.id, name, room });
    // console.log("에러", error);
    // console.log("유저", user);
    if (user) {
      socket.emit("message", {
        user: "admin",
        text: `${user.name}님 ㅎㅇ요, ${user.room}에 오신것을 환영함.`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}이 접속했습니다.`,
      });
      socket.join(user.room);
      nowUser.name = user.name;
      nowUser.room = user.room;
      // console.log("현재유저정보", nowUser);
      // console.log("소켓id", socket.id);
      cb();
    } else {
      console.log("응 중복이야 돌아가 - 근데 이걸 클라이언트에 어케보냄?");
      cb(error);
    }
  });

  socket.on("sendMessage", (name, msg, cb) => {
    const user: User = getUser(name);
    if (user.room && user.name) {
      io.to(user.room).emit("message", { user: user.name, text: msg });
    }
    cb();
  });

  // 닉네임 변경 시도
  socket.on("change", (name, newname, cb) => {
    const user: User = getUser(name);
    const { room } = user;
    const data: string[] = changeUserName(name, newname);

    if (data.length > 1) {
      nowUser.name = data[1];
      socket.emit("message", {
        user: "admin",
        text: `닉네임 변경 성공. ${name} → ${newname}`,
      });
      socket.broadcast.to(room).emit("message", {
        user: "admin",
        text: `${name}님이 ${newname}으로 닉네임을 변경함.`,
      });

      cb();
    } else {
      cb({ error: "닉네임이 중복이거나 해당 유저를 찾을 수 없음" });
    }
  });

  // // 클라이언트가 메시지를 보낼 때
  // socket.on("chat message", (msg) => {
  //   console.log("메시지 :", msg);
  //   io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전달
  // });

  // 클라이언트가 연결을 수동으로 끊을 때
  socket.on("quit", (name) => {
    const user: User | undefined = removeUser(name);
    if (user) {
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}님이 퇴장하였습니다.`,
      });
    }
  });

  socket.on("pong", () => {
    console.log("pingpong 중..");
    socket.emit("ping");
  });

  // 클라이언트가 끊겼을 때
  socket.on("disconnect", () => {
    if (nowUser.name && nowUser.room) {
      socket.broadcast.to(nowUser.room).emit("message", {
        user: "admin",
        text: `${nowUser.name}님이 퇴장하였습니다.`,
      });

      removeUser(nowUser.name);
    }
  });
});
