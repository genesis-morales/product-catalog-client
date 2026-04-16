import axios, { AxiosInstance } from 'axios';

let guestCartToken: string | null = localStorage.getItem('cart_token');

export const setCartToken = (token: string) => {
  guestCartToken = token;
  localStorage.setItem('cart_token', token);
};

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Token de autenticación
  const authToken = localStorage.getItem('auth_token');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  // Token del carrito guest
  const cartToken = guestCartToken ?? localStorage.getItem('cart_token');
  if (cartToken) {
    config.headers['X-Cart-Token'] = cartToken;
  }

  return config;
});

export default api;
