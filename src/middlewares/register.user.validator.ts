import Joi from 'joi';
import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import { RegisterRequestSchema } from '@appTypes';

const registerRequestSchema = Joi.object<RegisterRequestSchema>().keys({
  body: Joi.object<RegisterRequestSchema['body']>().required().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
});

const registerReqValidator = (req: Req, res: Res, next: Nxt): void => {
  let { error } = registerRequestSchema.validate(req.body);
  if (error) throw new ApiError(httpStatus.BAD_REQUEST, error.message);

  next();
};

export { registerReqValidator };
