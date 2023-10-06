import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Exception } from "handlebars";

@Injectable() 
export class MailerServices{
    constructor(private readonly mailerService: MailerService){

    }
    sendMail(email,password){
      try {
        this.mailerService.sendMail({
            to: email.toString(),
            from: 'beingfahad786@gmail.com',
            subject: 'Testing the node mailer',
            text: `Welcome to Socialee App`, 
            html: '<p>Welcome to Socialee App. Here are your credentials:</p>' +
        `<p>Email: ${email}</p>` +
        `<p>Password: ${password}</p>`
          })
      } catch (error) {
        // throw new Exception(error.toString());
        console.log(error.toString());
      }
    }
}