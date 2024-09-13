import Joi from 'joi';
import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import { LoginRequestSchema } from '@appTypes';

const loginReqSchema = Joi.object<LoginRequestSchema>().keys({
  body: Joi.object<LoginRequestSchema['body']>().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
});

const loginReqValidator = (req: Req, res: Res, next: Nxt): void => {
  let { error } = loginReqSchema.validate(req.body);
  if (error) throw new ApiError(httpStatus.BAD_REQUEST, error.message);

  next();
};

export { loginReqValidator };
