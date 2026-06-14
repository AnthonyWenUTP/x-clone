import { api } from '@/lib/api';

export async function uploadMedia(file: File) {
    const form = new FormData();

    form.append('file', file);

    const response = await api.post('/media/upload',
        form,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );

    return response.data;
}