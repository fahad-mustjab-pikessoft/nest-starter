import { Users } from "src/users/users.entity";
import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Likes } from "../like/likes.entity";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn("uuid")
    postId: string;

    @Column()
    title: string;


    @Column()
    description:string


    

    @Column({default: 0})
    likesCount: number;
    @Column({default: 0})
    commentsCount:  number;


    @OneToMany(() => Likes, like => like.post)
    likes: Likes[];



    @ManyToOne(() => Users, user => user.posts) 
    @JoinColumn({ name: 'userId' }) // Foreign key column
    user: Users;


    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date ;





}