import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let prisma: any;
  beforeEach(() => {
    prisma = {
      post: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };
    service = new PostsService(prisma);
  });

  describe('createPost', () => {
    it('creates a post', async () => {
      prisma.post.create.mockResolvedValue({
        id: 'post1',
        content: 'hello',
        authorId: 'user1',
        replyToId: null,
        createdAt: new Date(),
        author: {
          id: 'user1',
          username: 'test',
          avatarUrl: null,
        },
        _count: {
          likes: 0,
          replies: 0,
        },
      });

      const result = await service.createPost('user1', {
        content: 'hello',
      });

      expect(result.content).toBe('hello');

      expect(prisma.post.create).toHaveBeenCalled();
    });
  });

  describe('reply validation', () => {
    it('rejects missing parent post', async () => {
      prisma.post.findUnique.mockResolvedValue(null);
      await expect(
        service.createPost('user1', {
          content: 'reply',
          replyToId: 'missing',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
