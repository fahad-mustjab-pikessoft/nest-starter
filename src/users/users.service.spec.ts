import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

// Mock your TypeORM repository
const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  findOneBy: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const password = 'password';

      // Mock the behavior of your repository
      mockRepository.create.mockReturnValue({ id: 1, email, password });
      mockRepository.save.mockResolvedValue({ id: 1, email, password });

      const user = await usersService.create(email, password);

      expect(user).toEqual({ id: 1, email, password });
    });
  });


  describe('update', () => {
    it('should update an existing user', async () => {
      const id = 1;
      const attrs = { email: 'new@example.com', password: 'newpassword' };
      const existingUser = { id: 1, email: 'old@example.com', password: 'oldpassword' };

     
      mockRepository.findOneBy.mockResolvedValue(existingUser);
      mockRepository.save.mockResolvedValue({ ...existingUser, ...attrs });

      const updatedUser = await usersService.update(id, attrs);

      expect(updatedUser).toEqual({ ...existingUser, ...attrs });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const id = 1;
      const attrs = { email: 'new@example.com' };

      mockRepository.findOneBy.mockResolvedValue(undefined);

      await expect(usersService.update(id, attrs)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const id = 1;
      const existingUser = { id: 1, email: 'test@example.com', password: 'password' };

      mockRepository.findOneBy.mockResolvedValue(existingUser);
      mockRepository.remove.mockResolvedValue(existingUser);

      await usersService.remove(id);

      expect(mockRepository.remove).toHaveBeenCalledWith(existingUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const id = 1;

      mockRepository.findOneBy.mockResolvedValue(undefined);

      await expect(usersService.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  

});

