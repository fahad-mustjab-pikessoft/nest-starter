import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "src/users/users.entity";
import { Posts } from "../post/post.entity";

@Entity()
export class Likes{

    @PrimaryGeneratedColumn("uuid")
    columnId: string


    @ManyToOne(() => Users, user => user.posts) 
    user: Users;

    @ManyToOne(() => Posts, post => post.likes)
    @JoinColumn({ name: 'postId' }) // Foreign key column

    post: Posts;
    

}