import axios from 'axios';

// Para desarrollo (DEV)
const dbHost = process.env.REACT_APP_BACKEND_HOST ?? '';
const dbPort = process.env.REACT_APP_BACKEND_PORT ?? '';

// URL base según el entorno PROD o DEV
const baseURL = process.env.REACT_APP_BACKEND_URL_PROD || `http://${dbHost}:${dbPort}`;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adjuntar el token en cada request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
