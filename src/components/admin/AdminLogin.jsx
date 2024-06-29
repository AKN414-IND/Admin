import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username !== adminUsername) {
      setError('Error: Invalid username');
    } else if (password !== adminPassword) {
      setError('Error: Invalid password');
    } else {
      onLogin(); 
      setError(''); 
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
