import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { RegisterRequestSchema, LoginRequestSchema } from './joi.types';

export type AsyncControllerType<RQ extends Req, RS extends Res> = (
  req: RQ,
  res: RS,
  next?: Next
) => Promise<any | void>;

interface EmptyRequest extends Req {
  params: any;
  body: any;
  query: any;
}

export interface RegisterRequest extends RegisterRequestSchema {
  params: any;
  query: any;
}
export interface LoginRequest extends LoginRequestSchema {
  params: any;
  query: any;
}

interface AuthorizedRequest {
  body: {
    id: string;
  };
}
