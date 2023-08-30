import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn("uuid")
    postId: number;

    @Column()
    title: string;

    @Column()
    likesCount: number;

    @Column()
    commentsCount:number;
    



}