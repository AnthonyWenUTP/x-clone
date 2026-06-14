import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, followUser, unfollowUser } from './api';

export function useUserProfile(
    username: string,
) {
    return useQuery({
        queryKey: [
            'user',
            username,
        ],
        queryFn: () => getUserProfile(username),
    });
}

export function useFollowUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: followUser, onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    'user',
                ],
            });
        },
    });
}

export function useUnfollowUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: unfollowUser, onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    'user',
                ],
            });
        },
    });
}