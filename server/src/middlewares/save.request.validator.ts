import Joi from 'joi';
import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import { SaveRequest } from '@appTypes';

const reqBodySchema = Joi.object<SaveRequest>().keys({
  param: Joi.number().required()
});

const paramSaveReqValidator = (req: Req, res: Res, next: Nxt): void => {
  let { error } = reqBodySchema.validate(req.body);
  if (error) throw new ApiError(httpStatus.BAD_REQUEST, error.message);

  next();
};

export { paramSaveReqValidator };
