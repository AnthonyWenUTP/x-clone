import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createPost, createReply, CreateReplyInput, getThread } from './api';
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
                client.invalidateQueries({
                    queryKey: [
                        'thread'
                    ]
                });
            },
        });
}

export function useThread(id: string) {
    return useQuery({
        queryKey: [
            'thread',
            id,
        ],
        queryFn: () => getThread(id),
    });
}