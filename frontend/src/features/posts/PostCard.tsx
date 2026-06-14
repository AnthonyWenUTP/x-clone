import { Post } from './types';
import { useLikePost } from './use-posts';
import Link from 'next/link';

export function PostCard({
    post,
}: {
    post: Post;
}) {
    const like = useLikePost();
    return (
        <article>
            <strong>
                {post.author.username}
            </strong>

            <p>
                {post.content}
            </p>

            <button
                onClick={() =>
                    like.mutate(post.id)
                }
            >
                ❤️ {post.stats.likes}
            </button>
            <Link href={`/posts/${post.id}`}>
                Reply
            </Link>
        </article>
    );
}