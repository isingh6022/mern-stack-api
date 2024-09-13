import { MethodNotImplemented } from '@appErrors';
import { Stock, User } from '@appTypes';
import { StockCache } from './StockCache';

export class StockService {
  static getUpdateForUser(user: User): any {}
  static getStockData(stockId: string): Promise<Stock | null> {
    return StockCache.instance.get(stockId);
  }
  static searchStock(q: string): Promise<Stock[]> {
    throw new MethodNotImplemented();
  }
}
