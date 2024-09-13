import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import { RequestCountService } from '@appServices';
import { configs } from '@appConfig';

const requestFrequencyValidator = (req: Req, res: Res, next: Nxt): void => {
  if (req.socket.remoteAddress) {
    RequestCountService.increment(req.socket.remoteAddress);

    if (RequestCountService.getCount(req.socket.remoteAddress) > configs.reqPerIpLimit) {
      throw new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        `Too many requests, try after ${configs.reqPerIpTimeoutSec} seconds.`
      );
    }
  }

  next();
};

export { requestFrequencyValidator };
