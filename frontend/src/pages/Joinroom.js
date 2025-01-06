import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleJoin = () => {
    if (roomId.trim()) {
      // Navigate to the Doodle editor with the room ID
      navigate(`/doodle/${roomId}`);
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
