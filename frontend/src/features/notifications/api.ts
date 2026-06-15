import { api } from '@/lib/api';

export async function getNotifications() {
    const res = await api.get('/notifications');

    return res.data;
}