const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { connectDB, sequelize } = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
}));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// Database Connection
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log("Database synced."))
  .catch((err) => console.error("Error syncing database:", err));

// HTTP Server for Express and WebSocket
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

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit("user-joined", `${socket.id} has joined the room.`);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data.message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
