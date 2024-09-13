import { configs } from '@appConfig';

export class RequestCountService {
  private static _timeout = configs.reqPerIpTimeoutSec * 1000;

  private static _cache: { [ip: string]: number[] } = {};
  private static removeTimedoutRequests(ip: string) {
    if (this._cache[ip]) {
      const currTs = new Date().getTime();
      this._cache[ip] = this._cache[ip].filter((ts) => currTs - ts < this._timeout);
    } else {
      this._cache[ip] = [];
    }
  }

  static increment(ip: string) {
    this.removeTimedoutRequests(ip);
    this._cache[ip].push(new Date().getTime());
  }
  static decrement(ip: string) {
    this.removeTimedoutRequests(ip);
    this._cache[ip].length && this._cache[ip].shift();
  }
  static getCount(ip: string) {
    this.removeTimedoutRequests(ip);
    return this._cache[ip] ? this._cache[ip].length : 0;
  }
}
