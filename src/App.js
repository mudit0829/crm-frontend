import React from 'react';
import Login from './components/auth/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  return (
    <div>
      <h1>CRM Demo</h1>
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
