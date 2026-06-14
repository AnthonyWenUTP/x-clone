'use client';

import { useState } from 'react';
import { useCreateReply } from './use-posts';

export function ReplyComposer({ postId }: { postId: string }) {
    const [content, setContent] = useState('');
    const reply = useCreateReply();

    function submit() {
        if (!content.trim()) {
            return;
        }

        reply.mutate({
            postId,
            content,
        });
        setContent('');
    }

    return (
        <div className="space-y-2">
            <textarea
                value={content}
                onChange={
                    e => setContent(e.target.value)
                }
                placeholder="Post your reply"
                className="border p-2 w-full"
            />

            <button
                onClick={submit}
                disabled={
                    reply.isPending
                }

            >
                {
                    reply.isPending
                        ? 'Replying...'
                        : 'Reply'
                }
            </button>
        </div>
    );
}