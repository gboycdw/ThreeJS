import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
// Cors
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3002",
  })
);

// Router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("서버 정상 동작 중 : 메인 페이지");
});
app.use(router);

// Server On
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Websoket
const io = new SocketIOServer(server); // 추후 server => server, corsOption 으로 변경
io.on("connection", (socket) => {
  console.log("새 클라이언트가 연결됨");

  socket.on("join", (name, room) => {
    console.log(name, room);
  });

  // 클라이언트가 메시지를 보낼 때
  socket.on("chat message", (msg) => {
    console.log("메시지 :", msg);
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전달
  });

  // 클라이언트가 연결을 끊을 때
  socket.on("disconnect", () => {
    console.log("클라이언트가 떠났음");
  });
});
