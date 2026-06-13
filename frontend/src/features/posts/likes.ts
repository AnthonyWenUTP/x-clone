import { api } from '@/lib/api';

export async function likePost(
    postId: string,
) {
    return api.post(
        `/posts/${postId}/like`
    );
}

export async function unlikePost(
    postId: string,
) {
    return api.delete(
        `/posts/${postId}/like`,
    );
}