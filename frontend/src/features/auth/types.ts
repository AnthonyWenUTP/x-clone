export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
}