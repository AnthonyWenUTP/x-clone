import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { TimelineQueryDto } from './dto/timeline-query.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(
        @CurrentUser()
        user: {
            id: string;
        },

        @Body() dto: CreatePostDto,
    ) {
        return this.postsService.createPost(
            user.id,
            dto,
        );
    }

    @Get(':id')
    getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePost(
        @Param('id') id: string,

        @CurrentUser()
        user: {
            id: string;
        },
    ) {
        return this.postsService.deletePost(
            user.id,
            id,
        );
    }

    @Get('/user/:username')
    getUserTimeline(
        @Param('username') username: string,

        @Query() query: TimelineQueryDto,
    ) {
        return this.postsService.getUserTimeline(
            username,
            query.cursor,
        );
    }
}