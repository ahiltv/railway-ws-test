const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const WS_PATH = "/ws/dmtnetwork";

// 🧠 MAIN CONFIG (سنایی)
const BACKEND_SERVER = "104.16.74.158";
const BACKEND_PORT = 8443;

// 🌐 Home (Worker style)
app.get("/", (req, res) => {
  res.send("DMTnetwork Worker Gateway Online");
});

// 🔥 Proxy-like endpoint (Worker behavior)
app.get("/proxy", async (req, res) => {
  try {
    res.json({
      status: "ok",
      message: "Gateway active",
      backend: BACKEND_SERVER
    });
  } catch (e) {
    res.status(500).send("error");
  }
});

// ⚡ Config generator (مثل Worker API)
app.get("/config/:id", (req, res) => {
  const id = req.params.id;

  const config = {
    id,
    server: BACKEND_SERVER,
    port: BACKEND_PORT,
    type: "trojan/ws",
    security: "tls",
    path: "/assets/api/v1/sync",
    host: "x.newfacesis.xyz",
    sni: "x.newfacesis.xyz"
  };

  res.json(config);
});

// ⚡ WebSocket control layer
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
    console.log("WS:", msg.toString());

    ws.send(JSON.stringify({
      event: "echo",
      data: msg.toString()
    }));
  });
});

// 🚀 start
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("DMT Worker Gateway running");
  console.log("WS:", WS_PATH);
});

const axios = require("axios");

// 🚀 Forward to Sanaei (REAL BRIDGE)
app.get("/go", async (req, res) => {
  try {
    const response = await axios.get("https://x.newfacesis.xyz", {
      timeout: 5000
    });

    res.json({
      status: "connected",
      backend: "sanaei",
      data: response.data
    });

  } catch (e) {
    res.json({
      status: "error",
      message: "cannot reach sanaei"
    });
  }
});
