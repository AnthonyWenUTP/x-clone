import { Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowsService } from '../follows/follows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,

    private readonly followsService: FollowsService,
  ) {}

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
}