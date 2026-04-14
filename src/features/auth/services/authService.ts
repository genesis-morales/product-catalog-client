import api from '../../../services/api';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/login', credentials);
    return response.data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/register', data);
    return response.data;
  }

  static async logout(): Promise<void> {
    await api.post('/logout');
  }

  static async me(): Promise<AuthResponse['user']> {
    const response = await api.get('/me');
    return response.data;
  }
}