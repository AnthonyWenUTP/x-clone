import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

const TIMELINE_PAGE_SIZE = 20;

@Injectable()
export class PostsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async createPost(
        authorId: string,
        dto: CreatePostDto,
    ) {
        if (dto.parentPostId) {
            const parentPost =
                await this.prisma.post.findUnique({
                    where: {
                        id: dto.parentPostId,
                    },
                });

            if (!parentPost) {
                throw new NotFoundException(
                    'Parent post not found',
                );
            }
        }

        return this.prisma.post.create({
            data: {
                content: dto.content,
                authorId,
                parentPostId: dto.parentPostId,
            },

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
    }

    async deletePost(
        currentUserId: string,
        postId: string,
    ) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new NotFoundException(
                'Post not found',
            );
        }

        if (post.authorId !== currentUserId) {
            throw new ForbiddenException(
                'You cannot delete this post',
            );
        }

        await this.prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return {
            success: true,
        };
    }

    async getPost(postId: string) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },

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

        if (!post) {
            throw new NotFoundException(
                'Post not found',
            );
        }

        return post;
    }

    async getUserTimeline(
        username: string,
        cursor?: string,
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        const posts = await this.prisma.post.findMany({
            where: {
                authorId: user.id,

                parentPostId: null,
            },

            orderBy: {
                createdAt: 'desc',
            },

            take: TIMELINE_PAGE_SIZE + 1,

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

        if (posts.length > TIMELINE_PAGE_SIZE) {
            const nextItem = posts.pop();

            nextCursor = nextItem!.id;
        }

        return {
            data: posts,

            nextCursor,
        };
    }
}