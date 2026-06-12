import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PaginatedPosts } from '../posts/types';

export function useFeed() {
    return useInfiniteQuery({
        queryKey: ['feed'],
        queryFn: async ({
            pageParam,
        }: {
            pageParam: string | undefined;
        }) => {
            const response =
                await api.get<PaginatedPosts>(
                    '/feed',
                    {
                        params: {
                            cursor: pageParam,
                        },
                    },
                );
            return response.data;
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage: PaginatedPosts ) => lastPage.nextCursor,
    });
}