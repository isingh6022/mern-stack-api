import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { configs } from '@appConfig';

const loginVarification = (req: Req, res: Res, next: Nxt): void => {
  const token = req.cookies.jwt;
  let loggedIn = false;

  if (token) {
    jsonwebtoken.verify(token, configs.jwtSecret, (err: any, decodedToken: any) => {
      if (decodedToken.userId) {
        loggedIn = true;
        req.body.userId = decodedToken.userId;
      }
      loggedIn ? next() : res.redirect('/auth/login');
    });
  } else {
    res.redirect('/auth/login');
  }
};

export { loginVarification };
