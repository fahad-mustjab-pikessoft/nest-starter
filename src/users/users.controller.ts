import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth-guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('Auth')
@Public()

@Controller('user')

// @Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService,private authService: AuthService){

    }

    
    @Post('/create')
     createUser(@Body() body: CreateUserDto ){
        console.log("creating user here  || ");
        return this.userService.create(body.email,body.password);
    }


    @Patch('/:id')
    updateUser(@Param('id') id: string,@Body() body: UpdateUserDto){
        console.log(body);
        // return this.userService.update(parseInt(id),body);
        return this.authService.update(parseInt(id),body);
    }


    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.userService.findOne(parseInt(id));
    }

    @Public()
    @Get()
    findAll(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

    @Delete()
    async deleteUserE(@Query('email') email:string){
        const [user] = await this.userService.find(email);
        return this.deleteUser(user.id.toString());

    }



   


    // @Post('signin')
    // async signIn(@Body() body: CreateUserDto,@Session() session: any){
    //     const res = await this.authService.signin(body.email,body.password);
    //     // session.userId = res.userId;
    //     return res.access_token;
    // }



  


    // @Post('signout')
    // signout(@Session() session: any){
    //     session.userId = null;
    // }


    // @UseGuards(AuthGuard)
   





    // @Get('user')






}
