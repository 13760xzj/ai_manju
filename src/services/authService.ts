import { apiClient } from './api';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthMeResponse {
  id: string;
  username: string;
  email?: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', { username, password });
    const data = response as unknown as LoginResponse;
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async register(username: string, password: string, email: string): Promise<void> {
    await apiClient.post('/auth/register', { username, password, email });
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<AuthMeResponse>('/auth/me');
    return response as unknown as User;
  }
};
