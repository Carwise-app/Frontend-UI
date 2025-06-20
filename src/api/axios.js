import axios from 'axios';


const api = axios.create({
  baseURL: 'https://carwisegw.yusuftalhaklc.com',
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0, // Redirect'leri manuel olarak yönet
  timeout: 30000, // 30 saniye timeout
  validateStatus: function (status) {
    return status >= 200 && status < 400; // 2xx ve 3xx durumlarını kabul et
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

  // PUT/PATCH istekleri için özel konfigürasyon
  if (config.method === 'put' || config.method === 'patch') {
    config.maxRedirects = 0; // Redirect'leri manuel yönet
    config.validateStatus = function (status) {
      return status >= 200 && status < 400;
    };
    config.timeout = 15000;
  }

  // GET istekleri için özel konfigürasyon
  if (config.method === 'get') {
    config.timeout = 15000; // 15 saniye timeout
    config.maxRedirects = 3;
    config.validateStatus = function (status) {
      return status >= 200 && status < 400;
    };
  }

  // POST istekleri için özel konfigürasyon
  if (config.method === 'post') {
    config.timeout = 15000;
    config.maxRedirects = 3;
  }
  
  return config;
});

// Response interceptor ekle
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
