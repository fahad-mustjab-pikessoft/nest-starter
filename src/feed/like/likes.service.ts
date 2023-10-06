import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Likes } from "./likes.entity";
import { Repository } from "typeorm";
import { PostService } from "../post/post.service";
import { UsersService } from "src/users/users.service";


@Injectable()
export class LikesService{
    constructor(@InjectRepository(Likes) private likesRepo: Repository<Likes>, private feedService: PostService,private userService: UsersService){

    }


    async addLike(userId: number,postId: string){
        const post = await this.feedService.findOne(postId);
        const user = await this.userService.findOne(userId);
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found.`);
        }
        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        var existingLike = await this.likesRepo.createQueryBuilder('likes').select('*').where('likes.postId = :postId',{postId}).andWhere('likes.userId = :userId',{userId}).getRawOne();

        if(existingLike){
             throw new ConflictException("User alread liked the post");
        }
        
        const like  = this.likesRepo.create({user,post});

        return this.likesRepo.save(like);
        
    }

    async removeLike(userId: number,postId: string){
        const post = await this.feedService.findOne(postId);
        const user = await this.userService.findOne(userId);
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found.`);
        }
        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        var existingLike = await this.likesRepo.createQueryBuilder('likes').select('*').where('likes.postId = :postId',{postId}).andWhere('likes.userId = :userId',{userId}).getRawOne();

        if(existingLike){
            return this.likesRepo.remove(existingLike);
        }
        return "Some Error Ocurred";
    }
}