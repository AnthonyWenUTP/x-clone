import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class LikesService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async likePost(
        userId: string,
        postId: string,
    ) {
        const post =
            await this.prisma.post.findUnique({
                where: {
                    id: postId,
                },
            });

        if (!post) {
            throw new NotFoundException(
                'Post not found',
            );
        }

        await this.prisma.like.upsert({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },

            create: {
                userId,
                postId,
            },

            update: {},
        });

        return {
            success: true,
        };
    }

    async unlikePost(
        userId: string,
        postId: string,
    ) {
        await this.prisma.like.deleteMany({
            where: {
                userId,
                postId,
            },
        });

        return {
            success: true,
        };
    }
}