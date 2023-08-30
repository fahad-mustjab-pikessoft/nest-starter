import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  PassportModule

],
  controllers: [UsersController],
  providers: [UsersService,AuthService,LocalStrategy]
})
export class UsersModule {}
