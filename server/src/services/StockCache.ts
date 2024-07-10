import { AppCache, Stock } from '@appTypes';
import { BaseSingleton } from './BaseSingleton';
import { MethodNotImplemented } from '@appErrors';
import { configs } from '@appConfig';
import { StockDAO } from './StockDAO';

export class StockCache extends BaseSingleton implements AppCache<string, Stock> {
  static get instance(): StockCache {
    return BaseSingleton._getInstance(StockCache) || new StockCache();
  }
  private static timeToLive = configs.stockDataCacheDurationSec * 1000;
  static _stockCache: { [stockId: string]: { ts: number; stock: Stock } } = {};
  static addToCache(stock: Stock) {
    this._stockCache[stock.id] = { ts: new Date().getTime(), stock };
  }

  searchStock(q: string): Promise<Stock | null> {
    throw new MethodNotImplemented();
  }
  setTimeToLive(ms: number): void {
    throw new MethodNotImplemented();
  }
  setMaxSize(n: number): void {
    throw new MethodNotImplemented();
  }
  get(q: string): Promise<Stock | null> {
    const stock = StockCache._stockCache[q];

    if (stock && new Date().getTime() - stock.ts < StockCache.timeToLive) {
      return Promise.resolve(stock.stock);
    } else {
      return StockDAO.instance.get(q).then((stockModelDAO) => {
        if (!stockModelDAO) {
          return null;
        }

        const stock = {
          id: stockModelDAO.identifier1,
          name: stockModelDAO.identifier2,
          price: stockModelDAO.currPrice
        };
        StockCache.addToCache(stock);

        return stock;
      });
    }
  }
  save(t: Stock): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  update(t: Stock, q?: string | undefined): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  delete(val: string | Stock): Promise<boolean> {
    throw new MethodNotImplemented();
  }
  contains(val: string | Stock): Promise<boolean> {
    throw new MethodNotImplemented();
  }
}
