import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Hello, [User]! Here's what's happening today:</p>
      
      {/* Quick Navigation */}
      <div className="dashboard-links">
        <Link to="/profile" className="btn">Profile</Link>
        <Link to="/settings" className="btn" style={{ marginLeft: '10px' }}>Settings</Link>
        <button className="btn" style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      
      {/* Example Feature */}
      <div className="dashboard-content">
        <h2>Recent Activity</h2>
        <p>No recent activity yet. Start doodling to see updates here!</p>
      </div>
    </div>
  );
}

export default Dashboard;
