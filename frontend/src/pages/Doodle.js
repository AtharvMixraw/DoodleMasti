import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const Doodle = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketInstance] = useState(() => io("http://localhost:5000"));

  useEffect(() => {
    socketInstance.emit("join-room", roomId);

    const handleUserJoined = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleReceivedMessage = (data) => {
      setMessages((prev) => [...prev, `${data.senderId === socketInstance.id ? "You" : "User"}: ${data.message}`]);
    };

    socketInstance.on("user-joined", handleUserJoined);
    socketInstance.on("receive-message", handleReceivedMessage);

    return () => {
      socketInstance.off("user-joined", handleUserJoined);
      socketInstance.off("receive-message", handleReceivedMessage);
      socketInstance.disconnect();
    };
  }, [roomId, socketInstance]);

  const sendMessage = () => {
    if (message.trim()) {
      socketInstance.emit("send-message", { roomId, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Doodle;
