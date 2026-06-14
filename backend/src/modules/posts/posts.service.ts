import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateReplyDto } from './dto/create-reply.dto';

const TIMELINE_PAGE_SIZE = 20;

@Injectable()
export class PostsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    private mapPost(post: any) {
        return {
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,

            replyToId: post.replyToId,

            author: {
                id: post.author.id,
                username: post.author.username,
                avatarUrl: post.author.avatarUrl,
            },

            stats: {
                likes: post._count.likes,
                replies: post._count.replies,
            },
        };
    }

    async createPost(
        authorId: string,
        dto: CreatePostDto,
    ) {
        if (dto.replyToId) {
            const parentPost =
                await this.prisma.post.findUnique({
                    where: {
                        id: dto.replyToId,
                    },
                });

            if (!parentPost) {
                throw new NotFoundException(
                    'Parent post not found',
                );
            }
        }
        const post =
            await this.prisma.post.create({
                data: {
                    content: dto.content,
                    authorId,
                    replyToId: dto.replyToId,
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

        return this.mapPost(post);
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

        return this.mapPost(post);
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

                replyToId: null,
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
            data: posts.map((post) =>
                this.mapPost(post),
            ),

            nextCursor,
        };
    }

    async createReply(postId: string, userId: string, dto: CreateReplyDto) {

        const parent = await this.prisma.post.findUnique({ where: { id: postId } });

        if (!parent) {
            throw new NotFoundException('Post not found');
        }

        return this.prisma.post.create({
            data: {
                content: dto.content,
                author: {
                    connect: {
                        id: userId
                    }
                },
                replyTo: {
                    connect: {
                        id: postId
                    }
                }
            },

            include: { author: true }
        });
    }

    async getThread(postId: string) {
        return this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                replies: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    include: {
                        author: true
                    }
                }
            }
        });
    }
}