import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepository } from './auth.repository';
import { User } from './auth.entity';
import * as bcrypt from 'bcryptjs';

const mockCredentialsDto = {
  username: 'TestUserName',
  password: 'TestPassword',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('sign up successfull', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('throws a conflict expression as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.not.toThrow(
        ConflictException,
      );
    });

    it('throws a conflict expression as username already exists', () => {
      save.mockRejectedValue({ code: '243541' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'TestUserName';
      user.validatePassword = jest.fn();
    });

    it('returns the username as the validaton is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );

      expect(result).toEqual('TestUserName');
    });

    it('returns null as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(user.validatePassword).not.toHaveBeenCalled();
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(result).toBeNull();
    });

    it('returns null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });


  describe('hashPassword',() => {
    it('calls bcrypt.hash to generate hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword('testPassword','testSalt');
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword','testSalt');
      expect(result).toEqual('testHash');
    })
  })
});
