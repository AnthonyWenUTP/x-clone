import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(
        @CurrentUser() user: { id: string },
        @Body() dto: CreatePostDto,
    ) {
        return this.postsService.createPost(
            user.id,
            dto,
        );
    }

    @Get(':postId')
    getPost(
        @Param('postId') postId: string,
    ) {
        return this.postsService.getPost(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postId')
    deletePost(
        @Param('postId') postId: string,

        @CurrentUser()
        user: { id: string },
    ) {
        return this.postsService.deletePost(
            user.id,
            postId,
        );
    }
}