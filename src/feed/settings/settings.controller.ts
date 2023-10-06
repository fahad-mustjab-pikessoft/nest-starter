import { Body, Controller, Delete, Get, Param, Patch, Post,Request } from "@nestjs/common";
import { PostNotificationDto } from "src/dtos/post-notification.dto";
import { SettingsService } from "./settings.service";
import { ApiBearerAuth } from "@nestjs/swagger";
@ApiBearerAuth()
@Controller('notification')
export class SettingController{
    constructor(private readonly settingsService: SettingsService){

    }
    @Post('notification')
    async postNotification(@Body() body:PostNotificationDto,@Request() request: any){
        return this.settingsService.postNotifications(parseInt(request.user.id),body.notifications);
    }


    @Get('notifications/:id')
    getNotifications(@Param('id') id: string){
        return this.settingsService.getNotifications(parseInt(id));
    }

    @Patch('notification/:id')
    updateNotifications(@Param('id') id:string,@Body() body:PostNotificationDto ){
        return this.settingsService.updateNotification(parseInt(id),body.notifications);
    }



    @Delete('notification/:notificationId')
    deleteNotification(@Param('id') id:string){
        return this.settingsService.deleteNotification(parseInt(id));
    }
}