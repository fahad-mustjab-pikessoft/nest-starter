import { Body, Controller, Param, Post, Request } from "@nestjs/common";
import { CreateCommentDto } from "src/dtos/create-comment.dto";
import { CommentsService } from "./comment.service";
import { ApiBearerAuth } from "@nestjs/swagger";
@ApiBearerAuth()
@Controller('comment')
export class CommentController{
    constructor(private  commentsService: CommentsService){
        
    }
    @Post('addComment/:id')
    addComment(@Param('id') id : string,@Request() request: any,@Body() body: CreateCommentDto){
        return this.commentsService.addComment(parseInt(request.user.id),id,body.content);
    }



    @Post('removeComment/:id')
    removeComment(@Param('id') commentId : string,@Request() request: any){
        return this.commentsService.removeComment(commentId);
    }
}