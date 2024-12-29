import React from 'react';

function CreateRoom() {
  const roomId = Math.random().toString(36).substr(2, 8);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied to clipboard!');
  };

  return (
    <div className="container">
      <h2>Create a Room</h2>
      <p>Your Room ID: <strong>{roomId}</strong></p>
      <button onClick={handleCopy} className="btn">Copy Room ID</button>
    </div>
  );
}

export default CreateRoom;
