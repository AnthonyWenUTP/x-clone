import { Injectable } from '@nestjs/common';
import { PrismaService} from '../../database/prisma.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createLikeNotification(actorId: string, postId: string,ownerId: string) {
        if (actorId === ownerId) {
            return;
        }

        await this.prisma.notification.create({
            data: {
                actorId,
                recipientId: ownerId,
                type: 'LIKE',
                postId,
            }
        });
    }

    async createFollowNotification(actorId: string, recipientId: string) {
        if (actorId === recipientId) {
            return;
        }

        await this.prisma.notification.create({
            data: {
                actorId,
                recipientId,
                type: 'FOLLOW'
            }
        });
    }

    async createReplyNotification(actorId: string, postId: string, ownerId: string) {
        if (actorId === ownerId) {
            return;
        }
        await this.prisma.notification.create({
            data: {
                actorId,
                recipientId: ownerId,
                type: 'REPLY',
                postId,
            }
        });
    }

    async getUserNotifications(userId: string) {
        return this.prisma.notification.findMany({
            where: {
                recipientId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50,
            include: {
                actor: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true
                    }
                },
                post: true
            }
        });
    }
}