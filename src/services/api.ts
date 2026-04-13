// src/shared/services/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Configuración base de la API
const DEFAULT_API_BASE_URL = 'http://localhost:8000/api';
const envApiUrl = (import.meta as any).env?.VITE_API_URL;
const API_BASE_URL = typeof envApiUrl === 'string' && /^https?:\/\//.test(envApiUrl)
  ? envApiUrl
  : DEFAULT_API_BASE_URL;

if (envApiUrl && API_BASE_URL === DEFAULT_API_BASE_URL) {
  console.warn(
    `VITE_API_URL inválido: ${envApiUrl}. Usando URL por defecto ${DEFAULT_API_BASE_URL}`
  );
}

// Crear instancia de axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Interceptors para manejo de errores
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Manejo centralizado de errores
    if (error.response?.status === 401) {
      // Redirigir a login si no autorizado
      console.error('No autorizado');
    } else if (error.response?.status >= 500) {
      console.error('Error del servidor');
    }

    return Promise.reject(error);
  }
);

export default api;
