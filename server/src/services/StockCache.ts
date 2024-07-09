import { AppCache, Stock } from '@appTypes';
import { BaseSingleton } from './BaseSingleton';

export class StockCache extends BaseSingleton implements AppCache<string, Stock> {
  static get instance(): StockCache {
    return BaseSingleton._getInstance(StockCache) || new StockCache();
  }

  searchStock(q: string): Promise<Stock | null> {
    return Promise.resolve(null);
  }
  setTimeToLive(ms: number): void {
    throw new Error('Method not implemented.');
  }
  setMaxSize(n: number): void {
    throw new Error('Method not implemented.');
  }
  get(q: string): Promise<Stock | null> {
    throw new Error('Method not implemented.');
  }
  save(t: Stock): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(t: Stock, q?: string | undefined): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(val: string | Stock): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  contains(val: string | Stock): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
