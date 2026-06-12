'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/use-auth';

export default function LoginPage() {
    const router = useRouter();
    const login = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(
        e: React.FormEvent,
    ) {
        e.preventDefault();

        await login.mutateAsync({
            email,
            password,
        });

        router.push('/feed');
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <input
                placeholder="email"
                value={email}
                onChange={
                    e => setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={
                    e => setPassword(e.target.value)
                }
            />

            <button>
                Login
            </button>
        </form>
    );
}