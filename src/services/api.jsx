const API_URL = import.meta.env.VITE_APP_API_URL;

async function request(url, method = "GET", body, token) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${url}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.status !== 204 ? res.json() : null;
}

export default {
  get: (url, token) => request(url, "GET", null, token),
  post: (url, body, token) => request(url, "POST", body, token),
  put: (url, body, token) => request(url, "PUT", body, token),
  del: (url, token) => request(url, "DELETE", null, token),
};

