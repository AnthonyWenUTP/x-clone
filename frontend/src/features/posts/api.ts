import { api } from '@/lib/api';
import type { Post } from './types';

export interface CreatePostDto {
    content: string;
}

export interface CreateReplyInput {
    postId: string;
    content: string;
}

export async function createPost(data: CreatePostDto) {
    const response = await api.post<Post>('/posts', data);
    return response.data;
}

export async function createReply(input: CreateReplyInput ) {
    const response = await api.post(`/posts/${input.postId}/replies`,
        {
            content:
                input.content,
        },
    );
    return response.data;
}