import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('@soundtrack/token') || '{}');
  if (token) {
    return {
      ...config,
      headers: { common: { Authorization: `Bearer ${token.token}` } },
    };
  }

  return config;
});

export default api;
