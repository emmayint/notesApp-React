const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on("error", (err, req, res) => {
  console.log(err);
  res.status(500).send("Proxy Error");
});

app.all("/service1/*", (req, res) => {
  // service1
  console.log(req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

app.all("/service2/*", (req, res) => {
  // service2
  console.log(req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:3002"
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: "http://localhost:4000"
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`));

// !! keep the ws component here!! It does not work in fileserver.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });
const notes = [];

const broadcastMessage = message => {
  wss.clients.forEach(client => {
    // broadcast
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message)); // server to client
    }
  });
};

const updateUserCount = () => {
  broadcastMessage({
    type: "UPDATE_USER_COUNT", // websocket is single channel, need a tag
    count: wss.clients.size
  });
};

const broadcastAllMessages = newNote => {
  notes.unshift(newNote);
  broadcastMessage({
    type: "UPDATE_MESSAGES",
    notes
  });
};

// wss: connection to the whole?
wss.on("connection", ws => {
  // a connection to a client
  console.log("Someone has connected");
  broadcastMessage("someone has connected!");
  updateUserCount();

  ws.on("message", message => {
    // handlesubmit in home.js trigers this
    const messageObject = JSON.parse(message);
    switch (messageObject.type) {
      case "SEND_MESSAGE":
        broadcastAllMessages(messageObject.newNote);
        break;
    }
    console.log(message);
  });

  ws.on("close", () => {
    // broadcastMessage("someone has disconnected!");
    updateUserCount();
    console.log("someone has disconnected!");
  });

  ws.on("error", e => {
    console.log(e);
  });
});
