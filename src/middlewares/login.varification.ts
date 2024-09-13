import { Request as Req, Response as Res, NextFunction as Nxt } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { configs } from '@appConfig';
import { UserService } from '@appServices';
import { asyncErrorWrapper } from '@appErrors';

const loginVarification = asyncErrorWrapper((async (req: Req, res: Res, next: Nxt) => {
  const token = req.cookies.jwt;
  let loggedIn = false;

  if (token) {
    jsonwebtoken.verify(token, configs.jwtSecret, async (err: any, decodedToken: any) => {
      if (decodedToken.userId) {
        const user = await UserService.getUser(decodedToken.userId);
        if (user) {
          loggedIn = true;
          req.body.user = user;
        }
      }
      loggedIn ? next() : res.redirect('/auth/login');
    });
  } else {
    res.redirect('/auth/login');
  }
}) as any);

export { loginVarification };
