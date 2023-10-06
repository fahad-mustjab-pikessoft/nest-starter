import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { JwtModule } from '@nestjs/jwt';
import {  APP_PIPE } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { FeedModule } from './feed/feed.module';
import { Posts } from './feed/post/post.entity';
import { LikesService } from './feed/like/likes.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerServices } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants/jwt.constants';
import { Comments } from './feed/comment/comment.entity';
import { Settings } from './feed/settings/settings.entity';
import { Likes } from './feed/like/likes.entity';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
   
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
   
    UsersModule, 
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'postgres',
        database: config.get<string>('DB_NAME'),
        host: config.get<string>('HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        synchronize: true,
        entities: [Users,Posts,Likes,Comments,Settings],
      };
    },
  }),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }), 
  
  FeedModule,
  
],
  controllers: [AppController],
  providers: [ AppService,MailerServices ,{provide: APP_PIPE,useValue: new ValidationPipe({whitelist:true})},
    JwtStrategy,
  
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({
        keys: ["abcdfgh"]})).forRoutes('*');
  }
}
