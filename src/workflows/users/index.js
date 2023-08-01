import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import UserService from '../../services/users';
import { createToken } from '../../utils/jwt';

export default class UserWorkflow {
  static async login({ email, password }) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new ApolloError('User not found.', 'USER_NOT_FOUND', {
        loggerLevel: 'warn',
      });
    }
    const arePasswordsSame = await bcrypt.compare(password, user.password);
    if (!arePasswordsSame) {
      throw new ApolloError('Invalid credentials.', 'INVALID_CREDENTIALS', {
        loggerLevel: 'warn',
      });
    }
    return {
      token: createToken({
        email: user.email,
        id: user.id,
        role: user.role,
      }),
    };
  }

  static async getAccountInfoById(id) {
    const user = await UserService.getAccountInfoById(id);

    if (!user) return null;
    return {
      ...user,
      // This is to prevent the password from being sent to the client
      password: undefined,
    };
  }

  static async getUsersList() {
    const users = await UserService.getUsersList();

    if (!users) return null;
    return users
      .filter((user) => user.role !== 'ADMIN')
      .map((user) => ({
        ...user,
        // This is to prevent the password from being sent to the client
        password: undefined,
      }));
  }
}
