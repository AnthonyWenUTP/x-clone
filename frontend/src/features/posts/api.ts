import { api } from '@/lib/api';
import type { Post } from './types';

export interface CreatePostDto {
    content: string;
}

export async function createPost(data: CreatePostDto) {
    const response = await api.post<Post>('/posts', data);
    return response.data;
}