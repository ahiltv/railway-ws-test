const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const WS_PATH = "/ws/dmtnetwork";

// 🧠 Users store (simple memory)
const users = new Map();

// 🌐 Home
app.get("/", (req, res) => {
  res.send("DMTnetwork Gateway Online");
});

// 🔑 Config generator endpoint (VERY IMPORTANT)
app.get("/config/:id", (req, res) => {
  const id = req.params.id;

  const config = {
    id: id,
    server: "railway-ws-test-production.up.railway.app",
    port: 443,
    path: WS_PATH,
    security: "tls",
    type: "ws",
    sni: "railway-ws-test-production.up.railway.app"
  };

  res.json(config);
});

// ⚡ WebSocket Server
const wss = new WebSocket.Server({
  server,
  path: WS_PATH
});

wss.on("connection", (ws) => {
  const userId = Math.random().toString(36).substring(7);
  users.set(userId, ws);

  ws.send(JSON.stringify({
    event: "connected",
    id: userId,
    system: "DMTnetwork"
  }));

  ws.on("message", (msg) => {
    ws.send("echo: " + msg);
  });

  ws.on("close", () => {
    users.delete(userId);
  });
});

// 🚀 Start
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("DMTnetwork Gateway running on", PORT);
  console.log("WS Path:", WS_PATH);
});
