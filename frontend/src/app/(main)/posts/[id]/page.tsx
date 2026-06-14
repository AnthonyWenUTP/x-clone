'use client';

import { useParams } from 'next/navigation';
import { useThread } from '@/features/posts/use-posts';
import { ReplyComposer } from '@/features/posts/ReplyComposer';

export default function ThreadPage() {
    const params = useParams();
    const id = params.id as string;
    const { data, isLoading } = useThread(id);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    if (!data) {
        return (
            <div>Post not found</div>
        );
    }

    return (
        <main className="space-y-6">
            <section>
                <h1>
                    @{data.author.username}
                </h1>
                <p>
                    {data.content}
                </p>
            </section>

            <ReplyComposer postId={id} />

            <section>
                <h2>
                    Replies
                </h2>
                {
                    data.replies.map(
                        (reply: any) => (
                            <div key={reply.id} className="border-b p-3">
                                <strong>
                                    @{reply.author.username}
                                </strong>

                                <p>
                                    {reply.content}
                                </p>
                            </div>
                        )
                    )
                }
            </section>
        </main>
    );
}