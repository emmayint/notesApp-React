const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

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

app.listen(4000);
