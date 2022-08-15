const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let connections = [];

io.on("connection", (socket) => {
  console.log("New Connection established: ", socket.id);
  connections.push(socket);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("draw", (data) => {
    connections.forEach((con) => {
      if (con.id !== socket.id && data) {
        con.emit("on_draw", { x: data.offsetX, y: data.offsetY });
      }
    });
  });

  socket.on("down", (data) => {
    connections.forEach((con) => {
      if (con.id !== socket.id) {
        con.emit("on_down", { x: data.offsetX, y: data.offsetY });
      }
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("Connection Disconnected ", socket.id);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server listening on PORT 3001");
});
