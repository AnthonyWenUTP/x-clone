'use client';
import { useFeed } from '@/features/feed/use-feed';
import { PostCard } from '@/features/posts/PostCard';
import { PaginatedPosts } from '@/features/posts/types';

export default function FeedPage() {
    const feed = useFeed();
    if (feed.isLoading) {
        return (<div> Loading... </div>);
    }

    return (
        <main>
            {feed.data?.pages.map(
                (page: PaginatedPosts) =>
                    page.data.map(
                        (post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ),
                    ),
            )}
        </main>
    );
}