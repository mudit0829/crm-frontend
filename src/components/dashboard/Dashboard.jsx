import React, { useEffect, useState } from 'react';
import { getCustomers, addCustomer } from '../../api';

function Dashboard({ token }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    async function load() {
      if (token) {
        const data = await getCustomers(token);
        setCustomers(data);
      }
    }
    load();
  }, [token]);

  async function handleAdd(e) {
    e.preventDefault();
    if (token) {
      const res = await addCustomer(form, token);
      setCustomers(c => [...c, res]);
      setForm({ name: '', email: '', phone: '', address: '' });
    }
  }

  return (
    <div>
      <h2>Customers</h2>
      <form onSubmit={handleAdd}>
        <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Name" required />
        <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="Email" required />
        <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="Phone" />
        <input value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} placeholder="Address" />
        <button type="submit">Add Customer</button>
      </form>
      <ul>
        {customers.map(c => (
          <li key={c.id}>{c.name} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
