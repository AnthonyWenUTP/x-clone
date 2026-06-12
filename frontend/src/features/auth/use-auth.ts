import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register, getCurrentUser } from './api';
import { setToken } from '@/lib/auth';

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      setToken(
        data.accessToken,
      );
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess(data) {
      setToken(
        data.accessToken,
      );
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: [
      'current-user',
    ],

    queryFn:
      getCurrentUser,

    retry: false,
  });

}