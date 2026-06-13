import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from './api';
import { likePost, unlikePost } from './likes';

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost, onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    'feed',
                ],
            });
        },
    });
}

export function useLikePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: likePost, onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    'feed',
                ],
            });
        },
    });

}