const API_URL = process.env.REACT_APP_API_URL;

export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const text = await res.text();
  if (!text) return { message: "No response from server" };
  try {
    return JSON.parse(text);
  } catch {
    return { message: "Invalid server response" };
  }
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const text = await res.text();
  if (!text) return { message: "No response from server" };
  try {
    return JSON.parse(text);
  } catch {
    return { message: "Invalid server response" };
  }
}

export async function getCustomers(token) {
  const res = await fetch(`${API_URL}/api/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  if (!text) return [];
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function addCustomer(data, token) {
  const res = await fetch(`${API_URL}/api/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
