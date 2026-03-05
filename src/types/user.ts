export interface User {
  id: string | number;
  username: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends User {
  worksCount: number;
  assetsCount: number;
  projectsCount: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
