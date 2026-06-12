import { api } from '@/lib/api';
import type { LoginDto, RegisterDto, AuthResponse, User } from './types';

export async function login(
  data: LoginDto,
) {
  const response =
    await api.post<AuthResponse>(
      '/auth/login',
      data,
    );
  return response.data;
}

export async function register(data: RegisterDto,) {
  const response =
    await api.post<AuthResponse>(
      '/auth/register',
      data,
    );
  return response.data;
}

export async function getCurrentUser() {
  const response =
    await api.get<User>(
      '/users/me',
    );
  return response.data;
}