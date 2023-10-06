import { BadRequestException, Injectable} from '@nestjs/common';
import { Posts } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { GetPostsDto } from 'src/dtos/get-posts.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Posts) private repo: Repository<Posts>,private userService: UsersService,){

    }

    async createPost(title:string,description:string,userId: number){
        const user = await this.userService.findOne(userId);
        const posts = this.repo.create({title,description,user});
        return this.repo.save(posts);
    }

  

    async deletePost(id: string){
        const post = await this.findOne(id);
        if(!post){
            throw new BadRequestException('No post found with this id');

        }
        return this.repo.remove(post);
    }


    findOne(postId: string){
        if(!postId){
            return null;
        }
        return this.repo.findOneBy({postId});
    }

    findAllPosts({orderBy,skip,take}: GetPostsDto){
        return this.repo.createQueryBuilder('posts').select('*').orderBy("posts.createdAt",orderBy == "DESC" ? "DESC" : "ASC")
        .skip(skip)
        .take(take).
        getRawMany();
    }


    async updatePost(postId: string,attr: Partial<Posts>){
        const post = await this.findOne(postId);
        if(!post){
            throw new BadRequestException("Post not found");
        }
        Object.assign(post,attr);
        return this.repo.save(post);

    }



}
