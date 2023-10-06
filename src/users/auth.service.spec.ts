import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";
import { BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MailerServices } from 'src/mailer.service';


class JwtMockService {
    sign(payload: any) {
        var token = 'mocked-jwt-token'; // Replace with your desired mock token
        return token;
    }
  }

  
  class MailerMockService {
    sendMail(email: string, password: string) {
      
    }
  }


describe('Auth Service',() =>{
    let service: AuthService;
    let fakeUserService: Partial<UsersService>

beforeEach(async () => {
     fakeUserService = {
        find: ()=>Promise.resolve([]), 
        create: (email: string,password:string) =>
            Promise.resolve({id:1,email,password} as Users ),
        generateSaltedHash: (password: string ) => 'salt.hash'
        
    }
    const module = await Test.createTestingModule({
        providers: [
            AuthService,{
                provide: UsersService,
                useValue: fakeUserService
            },
            {
                provide: JwtService,
                useClass: JwtMockService
            },{
                provide: MailerServices,
                useClass: MailerMockService
            }
        ],

    }).compile();

     service = module.get(AuthService);
    
})

it('can create an instance of auth service',async () => {
    
    expect(service).toBeDefined();
});

it('create a new user with salted and hashed password',async () => {
    const user = await service.signup("a@gmail.com","bcd");
    expect(user.password).not.toEqual('bcd');
    const [salt,hash] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined(); 
});

it('throws an error if the user signs up with an email that is already in use', async () => {
    fakeUserService.find = () => Promise.resolve([{id: 1, email: 'a',password:'1'} as Users]);

    
         expect( service.signup('a','a')).rejects.toThrow(BadRequestException);
    

});



it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('a@gmail.com', '1'),
    ).rejects.toThrow(BadRequestException);
  });


  
  it('throws if an invalid password is provided', async () => {
    fakeUserService = {
       find: () => Promise.resolve([
            { email: 'asdf@asdf.com', password: 'laskdjf' } as Users,
          ]),
        comparePassword: (password: string,givenPassword: string)=>{
            return password == givenPassword;
        }

    }
      
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });




}); 