import axios from 'axios';


const api = axios.create({
  baseURL: 'https://carwisegw.yusuftalhaklc.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  // Token istemeyen public endpoint listesi
  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/upload'
  ];

  // Eğer istek public endpoint'e gidiyorsa token eklenmesin
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Upload endpoint için özel header'lar
  if (config.url.includes('/upload')) {
    config.headers['Content-Type'] = 'multipart/form-data';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
