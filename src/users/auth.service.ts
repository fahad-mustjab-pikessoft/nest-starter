import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from './users.service';
import { JwtService } from "@nestjs/jwt";
import { Users } from "./users.entity";
import { MailerServices } from "src/mailer.service";



@Injectable()
export class AuthService{

    constructor(private userService: UsersService,private jwtService: JwtService,private mailerServices: MailerServices
        ){

    }
    async signup(email: string,password: string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException("Email already in use");
        }
        this.mailerServices.sendMail(email, password);

        var result = this.userService.generateSaltedHash(password);
        console.log(result.toString());
        const user = await this.userService.create(email,result);
        return user;

    }   

    async signin(email:string,password:string){
        const [users] = await this.userService.find(email);
        if(!users){
            throw new BadRequestException("User doesn't exit");
        }
        const result =  this.userService.comparePassword(users.password,password);
        if(result){
            const payload = { sub: users.id, username: users.email };
            var access_token = await this.jwtService.signAsync(payload);            
        }
        return {access_token};
    }

    async validateUserCred(email: string,password: string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new BadRequestException("User doesn't exit");
        }
        const result =  this.userService.comparePassword(user.password,password);
        if(result){
            return user;
        }
        return null;
    }

    generateToken(user: any) {
        return {
          access_token: this.jwtService.sign({
            name: user.name,
            sub: user.id,
          }),
        };
      }


      async update(id: number,attrs: Partial<Users>){
        if(attrs.password){
         const result = this.userService.generateSaltedHash(attrs.password);
         attrs.password = result;
        }

       const user = await this.userService.update(id,attrs);
       return user;
    }


  
}