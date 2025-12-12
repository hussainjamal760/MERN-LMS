import { Server as SocketIOServer } from "socket.io";
import http from "http";
require("dotenv").config();

export let io: SocketIOServer;

export const initSocketServer = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // Allow both transports
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected - Socket ID:", socket.id);
    console.log("👥 Total connected clients:", io.engine.clientsCount);

    // Test emission on connection
    socket.emit("welcome", { message: "Connected to server successfully!" });

    socket.on("notification", (data) => {
      console.log("📨 Received notification event:", data);
      io.emit("newNotification", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ A user disconnected - Reason:", reason);
      console.log("👥 Remaining clients:", io.engine.clientsCount);
    });

    socket.on("error", (error) => {
      console.error("⚠️ Socket error:", error);
    });
  });

  console.log("🚀 Socket.IO server initialized");
};