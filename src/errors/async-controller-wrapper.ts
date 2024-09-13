import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import httpStatus from 'http-status';
import { AsyncControllerType } from '@appTypes';

import { ApiError } from './error-classes';

/**
 * A wrapper around an async function. It returns a promise which resolves to the same value
 * as that of the frunction it wraps. The difference is it adds a catch clause with default
 * error handler.
 *
 * @param fn An asynchronous controller that returns a promise
 * @returns Promise with catch clause - resolves to same value as that of fn.
 */
export function asyncErrorWrapper<RQ extends Req, RS extends Res>(fn: AsyncControllerType<RQ, RS>) {
  return (req: RQ, res: RS, next: Next) => {
    Promise.resolve(fn(req, res, next)).catch((err: Error) =>
      next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message, err.stack))
    );
  };
}
