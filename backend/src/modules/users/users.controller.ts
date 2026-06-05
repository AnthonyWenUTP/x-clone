import { Controller, Get, Param, Post, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowsService } from '../follows/follows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TimelineQueryDto } from '../posts/dto/timeline-query.dto';
import { PostsService } from '../posts/posts.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly followsService: FollowsService,
    private readonly postsService: PostsService,
  ) { }

  @Get(':username')
  async getProfile(
    @Param('username') username: string,

    @CurrentUser() currentUser?: {
      id: string;
    },
  ) {
    return this.usersService.getProfile(
      username,
      currentUser?.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async followUser(
    @Param('id') followingId: string,

    @CurrentUser()
    currentUser: {
      id: string;
    },
  ) {
    return this.followsService.followUser(
      currentUser.id,
      followingId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/follow')
  async unfollowUser(
    @Param('id') followingId: string,

    @CurrentUser()
    currentUser: {
      id: string;
    },
  ) {
    return this.followsService.unfollowUser(
      currentUser.id,
      followingId,
    );
  }

  @Get(':username/posts')
  getUserPosts(
    @Param('username') username: string,
    @Query() query: TimelineQueryDto,
  ) {
    return this.postsService.getUserTimeline(
      username,
      query.cursor,
    );
  }
}