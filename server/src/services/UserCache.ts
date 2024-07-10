import { AppCache, User } from '@appTypes';
import { UserDAO } from './UserDAO';
import { MethodNotImplemented } from '@appErrors';
import { BaseSingleton } from './BaseSingleton';

export class UserCache extends BaseSingleton implements AppCache<string, User> {
  static get instance(): UserCache {
    return BaseSingleton._getInstance(UserCache) || new UserCache();
  }
  protected static _userCache: { [userId: string]: User } = {};

  setTimeToLive(ms: number): void {
    throw new MethodNotImplemented();
  }
  setMaxSize(n: number): void {
    throw new MethodNotImplemented();
  }
  get(id: string): Promise<User | null> {
    // for some reaons, user was interpreted as a number.
    // @ts-ignore
    const user: User = UserCache._userCache[id] | null;

    return Promise.resolve(user);
  }
  getByUserName(username: string): Promise<User | null> {
    for (let userId in UserCache._userCache) {
      const user = UserCache._userCache[userId];
      if (user.username == username) {
        return Promise.resolve(user);
      }
    }
    return Promise.resolve(null);
  }
  async save(u: User): Promise<boolean> {
    const ts = new Date().getTime();
    const id = ts + '' + Math.random();
    u.id = id;
    u.timeStamp = ts;

    UserCache._userCache[id] = u;
    return true;
  }
  update(u: User, q?: string | undefined): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  delete(val: string | User): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  contains(val: string | User): Promise<boolean> {
    throw new MethodNotImplemented();
  }
}
