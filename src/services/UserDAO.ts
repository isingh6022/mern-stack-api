import { MultipleSingletonInstancesError } from '@appErrors';
import { AppDAO, UserModelForDAO } from '@appTypes';
import { BaseSingleton } from './BaseSingleton';

/**
 * Class not required since database is not being used currently.
 */
export class UserDAO extends BaseSingleton implements AppDAO<string, UserModelForDAO> {
  static get instance(): UserDAO {
    return BaseSingleton._getInstance(UserDAO) || new UserDAO();
  }

  get(q: string): Promise<UserModelForDAO | null> {
    throw new Error('Method not implemented.');
  }
  save(t: UserModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(t: UserModelForDAO, q?: string | undefined): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(val: string | UserModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  contains(val: string | UserModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
