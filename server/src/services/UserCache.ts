import { AppCache, User } from '@appTypes';
import { UserDAO } from './UserDAO';
import { MultipleSingletonInstancesError } from '@appErrors';
import { BaseSingleton } from './BaseSingleton';

export class UserCache extends BaseSingleton implements AppCache<string, User> {
  static get instance(): UserCache {
    return BaseSingleton._getInstance(UserCache) || new UserCache();
  }

  setTimeToLive(ms: number): void {
    throw new Error('Method not implemented.');
  }
  setMaxSize(n: number): void {
    throw new Error('Method not implemented.');
  }
  get(q: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  save(t: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(t: User, q?: string | undefined): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(val: string | User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  contains(val: string | User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
