import { Controller, Param, Post,Request } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiBearerAuth } from "@nestjs/swagger";
@ApiBearerAuth()
@Controller('like')
export class LikeController{
    constructor(private readonly likesService: LikesService){

    }
    @Post('like/:id')
    likePost(@Param('id') id: string,@Request() request: any){
        // return this.feedService.incrementLikeCount(parseInt(request.user.id),id);
        return this.likesService.addLike(parseInt(request.user.id),id);
    }

    @Post('dislike/:id')
    dislikePost(@Param('id') id: string,@Request() request: any){
        // return this.feedService.incrementLikeCount(parseInt(request.user.id),id);
        return this.likesService.removeLike(parseInt(request.user.id),id,);
    }
}