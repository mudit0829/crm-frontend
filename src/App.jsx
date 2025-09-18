import React, { useState } from 'react';
import Login from './components/auth/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  const [token, setToken] = useState('');

  return (
    <div>
      <h1>CRM Frontend</h1>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Dashboard token={token} />
      )}
    </div>
  );
}
export default App;
