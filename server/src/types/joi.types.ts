export interface EnvSchema {
  PORT: string;
  MONGODB_URL: string;
  MODE: string;
  JWT_SECRET: string;
  JWT_DURATION_MIN: number;
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

export interface SaveRequest {
  param: number;
}
