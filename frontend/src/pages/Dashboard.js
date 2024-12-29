import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch user details from backend
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.username);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Hello, {username || 'User'}! Here's what's happening today:</p>
      
      {/* Quick Navigation */}
      <div className="dashboard-links">
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
      
      {/* Recent Activity */}
      <div className="dashboard-content">
        <h2>Recent Activity</h2>
        <p>No recent activity yet. Start doodling to see updates here!</p>
        <div className="room-actions">
          <button onClick={() => navigate('/create-room')} className="btn">Create a Room</button>
          <button onClick={() => navigate('/join-room')} className="btn" style={{ marginLeft: '10px' }}>Join a Room</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
