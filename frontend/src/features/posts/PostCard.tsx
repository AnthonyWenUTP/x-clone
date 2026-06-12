import { Post } from './types';

export function PostCard({
    post,
}: {
    post: Post;
}) {
    return (
        <article className="border-b p-4">
            <div>
                <strong>
                    {post.author.username}
                </strong>
            </div>

            <p className="mt-2">
                {post.content}
            </p>

            <div className="mt-3 text-sm">
                Likes:
                {' '}
                {post.stats.likes}
                {' '}
                Replies:
                {' '}
                {post.stats.replies}
            </div>
        </article>
    );
}