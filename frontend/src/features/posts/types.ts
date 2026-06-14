export interface Post {
    id: string;
    content: string;
    createdAt: string;

    author: {
        id: string;
        username: string;
        avatarUrl: string | null;
    };

    stats: {
        likes: number;
        replies: number;
    };

    replyToId: string | null;
}

export interface PaginatedPosts {
    data: Post[];
    nextCursor: string | null;
}

export interface MediaAttachment {
    id: string;
    url: string;
    type: 'IMAGE' | 'VIDEO';
}