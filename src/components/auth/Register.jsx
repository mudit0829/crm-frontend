import React, { useState } from 'react';
import { register } from '../../api';

function Register({ onRegistered }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(username, password);
    if (res.userId) {
      setSuccess('Registration successful. You can now log in.');
      setError('');
      onRegistered && onRegistered();
    } else {
      setError(res.message || 'Registration failed');
      setSuccess('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
    </form>
  );
}

export default Register;
