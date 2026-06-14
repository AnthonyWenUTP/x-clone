import { api } from '@/lib/api';
import type { UserProfile } from './types';
import type { PaginatedPosts } from '@/features/posts/types';

export async function getUserProfile(username: string) {
    const response = await api.get<UserProfile>(`/users/${username}`);
    return response.data;
}

export async function followUser(userId: string) {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
}

export async function unfollowUser(userId: string) {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
}

export async function getUserPosts(username: string, cursor?: string) {
    const response = await api.get<PaginatedPosts>(`/users/${username}/posts`,
            {
                params: {
                    cursor,
                },
            },
        );
    return response.data;
}