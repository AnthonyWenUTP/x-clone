import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(query: string) {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        bio: true,
      },
    });
  }

  async searchPosts(query: string) {
    return this.prisma.post.findMany({
      where: {
        content: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        media: true,
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });
  }
}
