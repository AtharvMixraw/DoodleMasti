import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (roomId.trim()) {
      try {
        // Validate the Room ID with the backend
        await axios.post('http://localhost:5000/api/room/join-room', { roomId });
        navigate(`/doodle/${roomId}`); // Navigate to the room if valid
      } catch (error) {
        alert('Room not found. Please check the Room ID and try again.');
      }
    } else {
      alert('Please enter a valid Room ID.');
    }
  };

  return (
    <div className="container">
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoin} className="btn">Join Room</button>
    </div>
  );
}

export default JoinRoom;
