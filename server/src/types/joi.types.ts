export interface EnvSchema {
  PORT: string;
  MONGODB_URL: string;
  MODE: string;
  JWT_SECRET: string;
  JWT_DURATION_MIN: number;
  STOCK_DATA_CACHE_DURATION_SECONDS: number;
  REQ_PER_IP: number;
  REQ_PER_IP_TIMEOUT_SECONDS: number;
  API_ENDPOINT: string;
  API_KEY: string;
  API_FUNCTION: string;
}

export enum Modes {
  DEBUG = 'DEBUG',
  PRODUCTION = 'PRODUCTION'
}

export interface RegisterRequestSchema {
  body: {
    username: string;
    password: string;
  };
}
export interface LoginRequestSchema {
  body: {
    username: string;
    password: string;
  };
}
export interface StockRequestSchema {
  params: {
    stockId: string;
  };
}
