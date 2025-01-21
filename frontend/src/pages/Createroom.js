import React, { useState } from 'react';
import axios from 'axios';

function CreateRoom() {
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/room/create-room');
      setRoomId(response.data.roomId);
      alert('Room created successfully. Room ID copied to clipboard!');
      navigator.clipboard.writeText(response.data.roomId);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="container">
      <h2>Create a Room</h2>
      {roomId && (
        <p>
          Your Room ID: <strong>{roomId}</strong>
        </p>
      )}
      <button onClick={handleCreateRoom} className="btn">Create Room</button>
    </div>
  );
}

export default CreateRoom;
