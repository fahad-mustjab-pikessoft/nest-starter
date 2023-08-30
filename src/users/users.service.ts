import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import {  randomBytes } from 'crypto';

var pbkdf2 = require('pbkdf2');

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>){

    }

    //create the user ;  
    create(email: string,password: string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);

    }

    async update(id: number, attrs: Partial<Users>){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        
        Object.assign(user,attrs);
        // console.log(user);
        return this.repo.save(user);
    }

    findOne(id: number){
        if(!id){
            return null;
        }
        return this.repo.findOneBy({id});
    }
    find(email:string){
        return this.repo.find({where: {email}});
    }


    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not Found");
        }
        return this.repo.remove(user);
    }


    generateSaltedHash(password:string){
        const salt = randomBytes(8).toString('hex');

        var hash =  pbkdf2.pbkdf2Sync(password,salt, 1, 32, 'sha512');
        var result = salt + '.' + hash.toString('hex');
        return result;
    }


    comparePassword(password:string,givenPassword:string){
        const [salt,storedHash] = password.split('.');
        const hash = pbkdf2.pbkdf2Sync(givenPassword,salt,1,32,'sha512') ;
        if(hash.toString('hex') != storedHash){
            throw new BadRequestException("Password doesn't match");

        }
        return true;
        
    }



}
