import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Navigate replace to="/admin" />} /> 
          <Route path="*" element={<Navigate replace to="/admin" />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
