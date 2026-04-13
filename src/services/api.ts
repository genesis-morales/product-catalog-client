import axios, { AxiosInstance } from 'axios';

let guestCartToken: string | null = null;

export const setCartToken = (token: string) => {
  guestCartToken = token;
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
  if (guestCartToken) {
    config.headers['X-Cart-Token'] = guestCartToken;
  }
  return config;
});

export default api;
