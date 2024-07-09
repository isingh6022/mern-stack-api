import { MultipleSingletonInstancesError } from '@appErrors';
import { Stock, User } from '@appTypes';

export class StockService {
  static getUpdateForUser(user: User): any {}
  static getStockData(stockId: string): Stock | null {
    return null;
  }
  static searchStock(q: string): Promise<Stock[]> {
    return Promise.resolve([]);
  }
}
