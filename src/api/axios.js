import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carwisegw.yusuftalhaklc.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password'
  ];

  const isPublic = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;