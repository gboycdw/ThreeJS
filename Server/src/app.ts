import express from "express";
import http from "http";
import cors from "cors";

const app = express();
// Router
const router = express.Router();
router.get("/", (req, res) => {
  res.send("서버 정상 동작 중 : 메인 페이지");
});
app.use(router);
// Cors
const corsOptions = {
  origin: "http://localhost:3002",
};

app.use(cors(corsOptions));
const server = http.createServer(app);
export { app, server, router };
