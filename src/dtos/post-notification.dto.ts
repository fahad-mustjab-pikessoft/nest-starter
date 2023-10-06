import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostNotificationDto{
    @ApiProperty()
    @IsString()
    notifications: string;
}