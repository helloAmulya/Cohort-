import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App (){
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/signin" />}
      />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default App;
