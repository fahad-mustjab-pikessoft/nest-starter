import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Settings } from "./settings.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";

@Injectable() 
export class SettingsService{
    constructor(@InjectRepository(Settings) private settingsRepo: Repository<Settings>,private userSerivce: UsersService){

    }

    async postNotifications(userId: number,notifications: string){
        const user = await this.userSerivce.findOne(userId);
        if(!user){
            throw new BadRequestException(`User with id: ${userId} doesn't exist`);

        }
        const notification = this.settingsRepo.create({user,notifications});
        return this.settingsRepo.save(notification);
    }

    async getNotifications(userId: number){
        const query = this.settingsRepo.createQueryBuilder('notifications').select('*').where('userId :userId',{userId});
        return query;
    }

    async updateNotification(userId: number,notifications:string){
        return this.settingsRepo.createQueryBuilder('settings')
      .update()
      .set({ notifications: notifications })
      .where('user.id = :userId', { userId })
      .execute();
    }


    async deleteNotification(notificationId: number){
        return this.settingsRepo.createQueryBuilder('settings')
      .delete()
      .where('settings.notificationid = :notificationId', { notificationId })
      .execute();
    }


}