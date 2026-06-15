import { api } from '@/lib/api';

export async function searchUsers(q: string) {
    const res = await api.get('/search/users',
        {
            params: {
                q
            }
        }
    );
    return res.data;
}