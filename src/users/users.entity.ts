import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, UpdateDateColumn,PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

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