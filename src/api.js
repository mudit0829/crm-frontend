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
