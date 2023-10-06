import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { GetPostsDto } from 'src/dtos/get-posts.dto';
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { LikesService } from '../like/likes.service';
import { request } from 'http';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { PostNotificationDto } from 'src/dtos/post-notification.dto';


@ApiBearerAuth()

@Controller('posts')
export class FeedController {

    constructor(private postService: PostService){

    }


    @Post('post')
    createPost(@Body() body: CreatePostDto,@Request() request: any){
        return this.postService.createPost(body.title,body.description,request.user.id);

    }


    @Get()
    getPosts(@Query() query: GetPostsDto){
        return this.postService.findAllPosts(query);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string){
        console.log(id);
        return this.postService.deletePost(id);
    }

    @Patch('/:id')
    updatePost(@Param('id') id: string,@Body() body: UpdatePostDto){
        this.postService.updatePost(id,body);
    }


}
