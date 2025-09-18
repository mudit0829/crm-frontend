import React, { useState } from 'react';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register onRegistered={() => setShowRegister(false)} />
            <button onClick={() => setShowRegister(false)}>Go to Login</button>
          </>
        ) : (
          <>
            <Login onLogin={setToken} />
            <button onClick={() => setShowRegister(true)}>Create Account</button>
          </>
        )}
      </div>
    );
  }

  return <Dashboard token={token} />;
}

export default App;
