import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LikesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly notificationsService: NotificationsService
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

        await this.notificationsService.createLikeNotification(
            userId,
            postId,
            post.authorId
        );
        
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