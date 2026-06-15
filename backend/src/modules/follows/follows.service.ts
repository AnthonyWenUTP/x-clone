import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class FollowsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly notifications: NotificationsService
    ) { }

    async followUser(
        followerId: string,
        followingId: string,
    ) {
        if (followerId === followingId) {
            throw new BadRequestException(
                'You cannot follow yourself',
            );
        }

        const targetUser = await this.prisma.user.findUnique({
            where: {
                id: followingId,
            },
        });

        if (!targetUser) {
            throw new NotFoundException('User not found');
        }

        const existingFollow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (existingFollow) {
            return {
                success: true,
            };
        }

        await this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });

        await this.notifications.createFollowNotification(
            followerId,
            followingId
        );

        return {
            success: true,
        };
    }

    async unfollowUser(
        followerId: string,
        followingId: string,
    ) {
        await this.prisma.follow.deleteMany({
            where: {
                followerId,
                followingId,
            },
        });

        return {
            success: true,
        };
    }
}