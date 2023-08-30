import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/users/auth.service";
import { Users } from "src/users/users.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){
        super({
            usernameField: 'email',
        });
    }
    async validate(email: string, password: string)  {
        console.log(email,password);
        const user = await this.authService.validateUserCred(email,password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;


    }
}