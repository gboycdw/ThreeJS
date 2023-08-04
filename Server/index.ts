import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const corsOption = {
  cors: {
    origin: "http://localhost3000",
  },
};
const io = new SocketIOServer(server); // 추후 server => server, corsOption 으로 변경
app.use(cors()); // 추후 cors() => cors(corsOption.cors) 로 변경

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 기본 라우트
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket.io 연결 및 채팅 로직 구현
io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결되었습니다.");

  // 클라이언트가 메시지를 보낼 때
  socket.on("chat message", (msg) => {
    console.log("메시지를 받았습니다:", msg);
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전달
  });

  // 클라이언트가 연결을 끊을 때
  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 끊었습니다.");
  });
});
