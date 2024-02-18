const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("active", (data) => {
    io.emit("client", {
      whoLiked: data.userId,
      whoLikedName: data.currentName,
      author: data.author,
      postId: data.postId,
    });
  });

  socket.on("active_comment", (data) => {
    io.emit("client_comment", {
      by: data.userId,
      byName: data.currentName,
      author: data.author,
      postId: data.postId,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Server is running ");
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
