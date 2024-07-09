import { AppDAO, StockModelForDAO } from '@appTypes';
import { BaseSingleton } from './BaseSingleton';

export class StockDAO extends BaseSingleton implements AppDAO<string, StockModelForDAO> {
  static get instance(): StockDAO {
    return BaseSingleton._getInstance(StockDAO) || new StockDAO();
  }

  get(q: string): Promise<StockModelForDAO | null> {
    throw new Error('Method not implemented.');
  }
  save(t: StockModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(t: StockModelForDAO, q?: string | undefined): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(val: string | StockModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  contains(val: string | StockModelForDAO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
