import { Module } from '@nestjs/common';
import { FeedController } from './post/post.controller';
import { PostService } from './post/post.service';
import { Posts } from './post/post.entity';
import { Users } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { LikesService } from './like/likes.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommentController } from './comment/comment.controller';
import { SettingController } from './settings/settings.controller';
import { CommentsService } from './comment/comment.service';
import { Comments } from './comment/comment.entity';
import { Settings } from './settings/settings.entity';
import { SettingsService } from './settings/settings.service';
import { Likes } from './like/likes.entity';
import { LikeController } from './like/like.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes,Comments,Posts,Users,Settings]),
    UsersModule,

  ],
  controllers: [FeedController,CommentController,LikeController,SettingController],
  providers: [CommentsService,LikesService,PostService,UsersService,SettingsService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
  exports: [FeedModule] ,
  

})
export class FeedModule {}
