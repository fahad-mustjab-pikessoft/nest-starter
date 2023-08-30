import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Request } from "express";


// declare global{
//     namespace Express{
//         interface Request{
//             headers: {
//                 authorization?: string;
//                 // Add any other custom headers you might use
//               };
//         }
//     }
// }


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){

    }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // return request.session.userId;
        const token = this.extractTokenFromHeader(request);
        console.log(token);
        if (!token) {
            throw new UnauthorizedException("unauthorized");
          }
          try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                secret: "secret"
              }
            );
              console.log(payload);
            request['user'] = payload;
          } catch {
            throw new UnauthorizedException();
          }
          return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

   
}