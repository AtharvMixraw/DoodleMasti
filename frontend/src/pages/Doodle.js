import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Doodle = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the room
    socket.emit("join-room", roomId);

    // Listen for user joins
    socket.on("user-joined", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for incoming messages
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    socket.emit("send-message", { roomId, message });
    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage("");
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
