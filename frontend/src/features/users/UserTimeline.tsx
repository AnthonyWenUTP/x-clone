'use client';

import { useUserPosts } from './use-user';
import { PostCard } from '@/features/posts/PostCard';

export function UserTimeline({
    username,
}: {
    username: string;
}) {
    const posts = useUserPosts(username);
    if (posts.isLoading) {
        return (<div> Loading posts...</div>);
    }

    return (
        <section>
            {posts.data?.pages.map(
                (page) =>
                    page.data.map(
                        (post) =>
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                    )
            )
            }

            {
                posts.hasNextPage && (
                    <button onClick={() => posts.fetchNextPage()} disabled={posts.isFetchingNextPage}>
                        {posts.isFetchingNextPage ? 'Loading...' : 'Load more'}
                    </button>
                )
            }
        </section>
    );
}