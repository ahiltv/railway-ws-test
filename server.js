const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const WS_PATH = "/ws/dmtnetwork";

// 🧠 Sanaei backend (your real VPN core)
const BACKEND_HOST = "x.newfacesis.xyz";
const BACKEND_PORT = 8443;

// =======================
// 🌐 HOME
// =======================
app.get("/", (req, res) => {
  res.send("DMTnetwork Worker Gateway Online");
});

// =======================
// 🔥 SIMPLE PROXY CHECK
// =======================
app.get("/proxy", (req, res) => {
  res.json({
    status: "ok",
    message: "Gateway active",
    backend: BACKEND_HOST
  });
});

// =======================
// ⚡ CONFIG GENERATOR
// =======================
app.get("/config/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    id: id,
    server: BACKEND_HOST,
    port: BACKEND_PORT,
    type: "trojan/ws",
    security: "tls",
    path: "/assets/api/v1/sync",
    host: BACKEND_HOST,
    sni: BACKEND_HOST
  });
});

// =======================
// 🚀 BRIDGE TEST (NO CRASH)
// =======================
app.get("/go", (req, res) => {
  res.json({
    status: "running",
    message: "Bridge ready (no direct tunnel yet)",
    backend: BACKEND_HOST
  });
});

// =======================
// ⚡ WEB SOCKET GATEWAY
// =======================
const wss = new WebSocket.Server({
  server,
  path: WS_PATH
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    event: "connected",
    system: "DMT Worker Gateway"
  }));

  ws.on("message", (msg) => {
    ws.send(JSON.stringify({
      event: "echo",
      data: msg.toString()
    }));
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// =======================
// 🚀 START SERVER
// =======================
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("DMT Worker Gateway running");
  console.log("HTTP OK");
  console.log("WS:", WS_PATH);
});
