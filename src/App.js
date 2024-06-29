// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
