import { Server as SocketIOServer } from "socket.io";
import http from "http";
require("dotenv").config();

export let io: SocketIOServer;

export const initSocketServer = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("notification", (data) => {
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};