import { AppDAO, StockModelForDAO } from '@appTypes';
import { BaseSingleton } from './BaseSingleton';
import { configs } from '@appConfig';
import { ApiError } from '@appErrors';
import httpStatus from 'http-status';

export class StockDAO extends BaseSingleton implements AppDAO<string, StockModelForDAO> {
  static get instance(): StockDAO {
    return BaseSingleton._getInstance(StockDAO) || new StockDAO();
  }

  get(q: string): Promise<StockModelForDAO | null> {
    const { url, apikey, fn } = configs.apiConfigs;

    // The api supported GET requests.
    let reqBody = '';
    const body: any = { apikey, function: fn, symbol: q };
    for (let key in body) {
      let encodedKey = encodeURIComponent(key),
        encodedValue = encodeURIComponent(body[key]);

      reqBody += `${encodedKey}=${encodedValue}&`;
    }
    reqBody = reqBody.substring(0, reqBody.length - 1);

    return new Promise((res, rej) => {
      fetch(url + '?' + reqBody, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data['Meta Data'] && data['Time Series Daily']) {
            res(data);
          } else {
            rej({ message: 'Security Not Found.' });
          }
        })
        .catch((err) => {
          if (err && err.message === 'Security Not Found.') {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Security not found.');
          }
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch the data');
        });
    });
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
