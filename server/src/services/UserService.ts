import { MultipleSingletonInstancesError } from '@appErrors';
import { User, UserLoginCredentials, UserModelForDAO } from '@appTypes';

export class UserService {
  static isLoggedIn(userId: string): boolean {
    return false;
  }
  static logout(userId: string): void {}
  static login(creds: UserLoginCredentials): Promise<boolean> {
    return Promise.resolve(false);
  }
  static getUserByUsername(username: string): Promise<User | null> {
    return Promise.resolve(null);
  }
  static getUser(userId: string): Promise<User | null> {
    return Promise.resolve(null);
  }
  static update(user: User): Promise<boolean> {
    return Promise.resolve(false);
  }
  static delete(userId: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  static create(user: Partial<UserModelForDAO>): Promise<boolean> {
    return Promise.resolve(false);
  }
  static requestFrequency(ipAddress: string): {
    count: number;
    duration: number;
    threshold: number;
  } {
    return { count: 0, duration: 10000, threshold: 10000 };
  }
}
