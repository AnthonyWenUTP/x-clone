import { InfiniteData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, followUser, unfollowUser, getUserPosts } from './api';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedPosts } from '../posts/types';

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

export function useUserPosts(username: string) {

    return useInfiniteQuery
        <
            PaginatedPosts,
            Error,
            InfiniteData<PaginatedPosts>,
            [string, string],
            string | undefined
        >({

            queryKey: ['user-posts', username],

            queryFn: ({
                pageParam,
            }) => {
                return getUserPosts(
                    username,
                    pageParam,
                );
            },

            initialPageParam: undefined,
            getNextPageParam: (lastPage) => { return lastPage.nextCursor ?? undefined; },
        });

}