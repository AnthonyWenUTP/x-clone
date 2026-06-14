import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { LikesService } from '../likes/likes.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly likesService: LikesService
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

    @UseGuards(JwtAuthGuard)
    @Post(':postId/like')
    likePost(
        @Param('postId') postId: string,

        @CurrentUser()
        user: { id: string },
    ) {
        return this.likesService.likePost(
            user.id,
            postId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postId/like')
    unlikePost(
        @Param('postId') postId: string,

        @CurrentUser()
        user: { id: string },
    ) {
        return this.likesService.unlikePost(
            user.id,
            postId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/replies')
    createReply(
        @Param('id')
        id: string,

        @Body()
        dto: CreateReplyDto,

        @CurrentUser()
        user: {
            id: string
        }
    ) {
        return this.postsService.createReply(
            id,
            user.id,
            dto
        );

    }

    @Get(':id/thread')
    getThread(

        @Param('id')
        id: string

    ) {

        return this.postsService.getThread(
            id
        );

    }
}