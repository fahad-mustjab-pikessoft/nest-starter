import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailerServices } from 'src/mailer.service';
import { Likes } from 'src/feed/like/likes.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Likes]),
  PassportModule

],
  controllers: [UsersController,AuthController],
  providers: [UsersService,AuthService,LocalStrategy,MailerServices],
  exports: [UsersService]
})
export class UsersModule {}
