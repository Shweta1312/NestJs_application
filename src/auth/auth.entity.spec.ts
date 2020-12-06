import { User } from './auth.entity';
import * as bcrypt from 'bcryptjs';
describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    bcrypt.hash = jest.fn();
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
  });

  describe('validatePassord', () => {
    it('returns true as passowrd is valid', async () => {
      bcrypt.hash.mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('1234');
      expect(bcrypt.hash).toHaveBeenCalledWith('1234', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as passowrd is invalid', async () => {
      bcrypt.hash.mockReturnValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('12345');
      expect(bcrypt.hash).toHaveBeenCalledWith('12345', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
