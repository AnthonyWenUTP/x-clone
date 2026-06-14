import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, createReply, CreateReplyInput } from './api';
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

export function useCreateReply() {
    const client = useQueryClient();

    return useMutation
        <
            unknown,
            Error,
            CreateReplyInput
        >({
            mutationFn: createReply, onSuccess() {
                client.invalidateQueries({
                    queryKey: [
                        'feed'
                    ]
                });
            },
        });

}