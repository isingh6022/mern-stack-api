import Joi from 'joi';
import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import { StockRequestSchema } from '@appTypes';

const registerRequestSchema = Joi.object<StockRequestSchema>().keys({
  params: Joi.object<StockRequestSchema['params']>().required().keys({
    stockId: Joi.string().required()
  })
});

const stockReqValidator = (req: Req, res: Res, next: Nxt): void => {
  let { error } = registerRequestSchema.validate(req.body);
  if (error) throw new ApiError(httpStatus.BAD_REQUEST, error.message);

  next();
};

export { stockReqValidator };
