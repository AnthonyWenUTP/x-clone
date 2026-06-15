import { useQuery } from '@tanstack/react-query';
import { searchUsers } from './api';

export function useUserSearch(q: string) {
    return useQuery({
        queryKey: [
            'search-users',
            q
        ],

        queryFn: () => searchUsers(q), enabled: q.length >= 2,
    });
}