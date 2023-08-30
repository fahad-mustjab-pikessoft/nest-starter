import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: any,context: ExecutionContext) => {
        console.log(data);
        const request = context.switchToHttp().getRequest();
        const user = request.currentUser;
        return user;
    }
    
)