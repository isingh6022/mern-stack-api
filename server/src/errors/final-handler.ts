import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { configs } from '@appConfig';
import { Modes } from '@appTypes';
import { ApiError } from './error-classes';

export const errorHandler = (err: ApiError, req: Req, res: Res, next: Next) => {
  const { code, message, stack } = err;

  console.log(`  # ERROR [${code}]: ${message}.\n`);

  let response: any = { code, message };
  if (configs.mode == Modes.DEBUG) {
    response = { ...response, stack };
  }

  res.status(code).json(response);
};
