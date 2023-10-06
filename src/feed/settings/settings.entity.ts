import { Users } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Settings{

    @PrimaryGeneratedColumn()
    notificationid: number;

    @OneToOne(() => Users, user => user.settings)
    @JoinColumn({name: 'userId'})
    user: Users;

    @Column()
    notifications: string;

}