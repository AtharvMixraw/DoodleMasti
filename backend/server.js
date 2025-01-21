const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { connectDB, sequelize } = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const roomRoutes = require("./routes/roomRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
}));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

// Database Connection
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log("Database synced."))
  .catch((err) => console.error("Error syncing database:", err));

// Create HTTP server for Express and WebSocket
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Notify others in the room
    socket.to(roomId).emit("user-joined", `${socket.id} has joined the room.`);
  });

  // Handle real-time messages
  socket.on("send-message", (data) => {
    const messageData = {
      senderId: socket.id,
      message: data.message,
    };
    io.to(data.roomId).emit("receive-message", messageData);
  });

  // Handle real-time changes (for collaborative actions like drawing)
  socket.on("change", (data) => {
    socket.to(data.roomId).emit("update", data);
  });

  // User disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.leaveAll();  // Remove user from all rooms
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
