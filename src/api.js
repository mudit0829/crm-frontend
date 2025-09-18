const API_URL = process.env.REACT_APP_API_URL;

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
}

export async function getCustomers(token) {
  const res = await fetch(`${API_URL}/api/customers`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

export async function addCustomer(data, token) {
  const res = await fetch(`${API_URL}/api/customers`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}
