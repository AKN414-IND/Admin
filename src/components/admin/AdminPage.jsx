import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import './AdminPage.css';


const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="admin-page">
      <h1>Watch4Deal Admin</h1>
      {!isLoggedIn ? (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <AdminPanel />
      )}
    </div>
  );
};

export default AdminPage;