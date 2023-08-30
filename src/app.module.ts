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
const cookieSession = require('cookie-session');


@Module({
  imports: [UsersModule,  TypeOrmModule.forRoot({
    type:"postgres",
    database: "postgres",
    host: "localhost",
    username: "postgres",
    password: "fahad",
    
    synchronize: true,
    entities: [Users],
  }), 
  JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  }), FeedModule,
  
],
  controllers: [AppController],
  providers: [AppService,{provide: APP_PIPE,useValue: new ValidationPipe({whitelist:true})},
    JwtStrategy
  
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({
        keys: ["abcdfgh"]})).forRoutes('*');
  }
}
