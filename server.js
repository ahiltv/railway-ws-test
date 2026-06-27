const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// 🔥 WebSocket Path (قابل تغییر)
const WS_PATH = "/ws/dmtnetwork";

const wss = new WebSocket.Server({
  server,
  path: WS_PATH
});

// 🌐 HTTP Test Route
app.get("/", (req, res) => {
  res.send("DMTnetwork OK");
});

// ⚡ WebSocket Connection
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("DMTnetwork connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    ws.send("echo: " + msg);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// 🚀 Port config (Railway auto)
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("DMTnetwork server running on port", PORT);
  console.log("WebSocket path:", WS_PATH);
});
