import { ApiError, MethodNotImplemented, MultipleSingletonInstancesError } from '@appErrors';
import { User, UserLoginCredentials, UserModelForDAO } from '@appTypes';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import { UserCache } from './UserCache';

export class UserService {
  static logout(userId: string): void {
    throw new MethodNotImplemented();
  }
  static async login(creds: UserLoginCredentials): Promise<User> {
    const { username, password } = creds;
    const user = await UserService.getUserByUsername(username);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid username.');
    } else {
      const authorized = await bcrypt.compare(password, user.password);

      if (authorized) {
        return user;
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password.');
      }
    }
  }
  static getUserByUsername(username: string): Promise<User | null> {
    return UserCache.instance.getByUserName(username);
  }
  static getUser(userId: string): Promise<User | null> {
    return UserCache.instance.get(userId);
  }
  static update(user: User): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  static delete(userId: string): Promise<boolean> {
    throw new MethodNotImplemented();
  }

  static create(
    user: Partial<UserModelForDAO> & { username: string; password: string }
  ): Promise<boolean> {
    return UserCache.instance.save({
      id: '',
      username: user.username!,
      timeStamp: new Date().getTime(),
      password: user.password
    });
  }
  static requestFrequency(ipAddress: string): {
    count: number;
    duration: number;
    threshold: number;
  } {
    return { count: 0, duration: 10000, threshold: 10000 };
  }
}
