import { useEffect } from 'react';
import { socket } from '@/lib/socket';

export function useNotificationSocket(userId: string) {
    useEffect(() => {
        socket.auth = {
            userId
        };
        socket.connect();

        const handler = (data: any) => {
            console.log(
                'notification',
                data
            );
        };

        socket.on(
            'notification',
            handler
        );

        return () => {
            socket.off(
                'notification',
                handler
            );
            socket.disconnect();
        };

    }, [userId]);
}