import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, UpdateDateColumn,PrimaryGeneratedColumn,CreateDateColumn, OneToMany, BeforeUpdate, OneToOne, JoinColumn } from "typeorm";
import { Settings } from "src/feed/settings/settings.entity";
import { Likes } from "src/feed/like/likes.entity";
import { Posts } from "src/feed/post/post.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    @Column()

    password: string;
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date ;


    @OneToMany(() => Posts,(post) => post.user)
    posts: Posts[];


    @OneToMany(() => Likes,(post) => post.user)
    likes: Likes[];

    @OneToOne(() => Settings, settings => settings.user, { eager: true, cascade: true })
    @JoinColumn()
    settings: Settings;



    @BeforeUpdate()
    updateTimestamp() {
    this.updatedAt = new Date();
    }

    @AfterInsert()
    logInsert(){
        console.log(`Add the user with id ${this.id}`);
    }

    @AfterUpdate() 
    logUpdate(){
        console.log(`Updated the user with id ${this.id}`);
        
    }

    @AfterRemove()    
    logRemove(){
        console.log(`Delete the user with id ${this.id}`);

    }

}