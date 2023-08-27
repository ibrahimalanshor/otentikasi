import { describe, expect, test } from '@jest/globals';
import { Auth } from '../src/auth';
import { AuthError } from '../src/errors/auth.error';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

describe.only('login test', () => {
  test('auth class must have login test', () => {
    expect(Auth.prototype).toHaveProperty('login');
    expect(typeof Auth.prototype.login).toEqual('function');
  });

  test('login method must throw login error if email is not found', async () => {
    class TestAuth extends Auth<User> {
      protected async createUser(credential: Partial<User>): Promise<User> {
        return credential as User;
      }
    }

    const auth = new TestAuth();

    await expect(
      auth.login({ email: 'test@email.com', password: 'password' }),
    ).rejects.toThrow(AuthError);
    await expect(
      auth.login({ email: 'test@email.com', password: 'password' }),
    ).rejects.toThrow('Email is not found');
  });
});
