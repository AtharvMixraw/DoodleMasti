const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
const documentRoutes = require('./routes/documentRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', documentRoutes);

// Socket.IO setup for real-time collaboration
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

    // Example event for real-time document updates
    socket.on('update-document', (data) => {
        socket.broadcast.emit('document-updated', data);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
