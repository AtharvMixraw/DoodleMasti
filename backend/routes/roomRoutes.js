const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let rooms = {};
router.post('/create-room', (req, res) => {
  const roomId = uuidv4();
  rooms[roomId] = { users: [] };
  res.status(201).json({ roomId });
});

router.post('/join-room', (req, res) => {  
    const { roomId } = req.body;
    if (rooms[roomId]) {
        res.status(200).json({ message: 'Room joined successfully!' });
    } else {
        res.status(404).json({ message: 'Room not found. Please check the Room ID and try again.' });
    }
});
module.exports = router;