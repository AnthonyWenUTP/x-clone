'use client';
import { useState } from 'react';
import { useCreatePost } from './use-posts';

export function PostComposer() {
    const [content, setContent] = useState('');
    const createPost = useCreatePost();

    async function submit(
        e: React.FormEvent,
    ) {
        e.preventDefault();
        if (!content.trim()) {
            return;
        }

        await createPost.mutateAsync({
            content,
        });

        setContent('');
    }

    return (
        <form onSubmit={submit} className="border-b p-4">
            <textarea
                value={content}
                onChange={
                    e => setContent(e.target.value)
                }
                placeholder="What's happening?"
            />

            <button
                disabled={
                    createPost.isPending
                }
            >
                Post
            </button>

        </form>

    );
}