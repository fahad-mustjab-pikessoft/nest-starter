import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Comments } from "./comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { PostService } from "../post/post.service";

@Injectable() 
export class CommentsService{
    constructor(@InjectRepository(Comments) private commentsRepo: Repository<Comments>,private postService: PostService,private userService: UsersService ){

    }


    async addComment(userId: number,postId: string,content: string){
        const post = await this.postService.findOne(postId);
        const user = await this.userService.findOne(userId);
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found.`);
        }
        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`);
        }


       
        const comment  = this.commentsRepo.create({user,post,content});
        console.log("Comment Created");
        return this.commentsRepo.save(comment);
        
    }

    async removeComment(commentId: string){
        

        const existingComment = await this.commentsRepo.createQueryBuilder('comments').select('*').where('comments.columnId = :commentId',{commentId}).getRawOne();

        if(existingComment){
            return this.commentsRepo.remove(existingComment);
        }
        
        
        throw new NotFoundException("Comment not found");
    }

    
}