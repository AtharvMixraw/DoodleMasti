import React, { useState } from 'react';

function JoinRoom() {
  const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    if (roomId) {
      alert(`Joining room with ID: ${roomId}`);
      // Navigate to the doodle editor
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
