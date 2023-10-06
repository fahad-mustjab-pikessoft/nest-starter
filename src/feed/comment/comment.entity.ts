import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "src/users/users.entity";
import { Posts } from "../post/post.entity";

@Entity()
export class Comments{

    @PrimaryGeneratedColumn("uuid")
    columnId: string


    @ManyToOne(() => Users, user => user.posts) 
    @JoinColumn({ name: 'userId' }) // Foreign key column
    user: Users;

    @ManyToOne(() => Posts, post => post.likes)
    @JoinColumn({ name: 'postId' }) // Foreign key column

    post: Posts;
    
    @Column()
    content: string;

}