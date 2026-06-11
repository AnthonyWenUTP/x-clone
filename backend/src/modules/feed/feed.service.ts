import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

const PAGE_SIZE = 20;

@Injectable()
export class FeedService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getFeed(
        currentUserId: string,
        cursor?: string,
    ) {
        const follows =
            await this.prisma.follow.findMany({
                where: {
                    followerId: currentUserId,
                },

                select: {
                    followingId: true,
                },
            });

        const authorIds = follows.map(
            (follow) => follow.followingId,
        );

        authorIds.push(currentUserId);

        const posts =
            await this.prisma.post.findMany({
                where: {
                    authorId: {
                        in: authorIds,
                    },

                    replyToId: null,
                },

                orderBy: {
                    createdAt: 'desc',
                },

                take: PAGE_SIZE + 1,

                ...(cursor && {
                    cursor: {
                        id: cursor,
                    },

                    skip: 1,
                }),

                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },

                    _count: {
                        select: {
                            likes: true,
                            replies: true,
                        },
                    },
                },
            });

        let nextCursor: string | null = null;

        if (posts.length > PAGE_SIZE) {
            const next = posts.pop();
            nextCursor = next!.id;
        }

        return {
            data: posts,
            nextCursor,
        };
    }
}