const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
  path: "/ws/Myb_studio"
});

app.get("/", (req, res) => {
  res.send("OK");
});

wss.on("connection", (ws) => {
  ws.send("connected");

  ws.on("message", (msg) => {
    ws.send("echo: " + msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});
