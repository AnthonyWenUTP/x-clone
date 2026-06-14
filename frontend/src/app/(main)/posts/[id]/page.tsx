'use client';

import { useParams } from 'next/navigation';

export default function ThreadPage() {
    const { id } = useParams();
    return (
        <main>
            Thread: {id}
        </main>
    );
}