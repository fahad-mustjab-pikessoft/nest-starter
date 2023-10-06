import { Body, Controller, Post, Session, UseGuards,Request } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "src/guards/local-auth-guard";
import { Public } from "src/decorators/public.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){
        
    }
    @Post('signup')
    async creatUser(@Body() body: CreateUserDto,@Session() session: any){
        const user =  await this.authService.signup(body.email,body.password);
        session.userId = user.id;
        return user;

    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: any,@Body() body: CreateUserDto){
        // console.log(request.user);

        return this.authService.generateToken(request.user);
    }
}