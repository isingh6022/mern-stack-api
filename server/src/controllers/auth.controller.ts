import { UserService } from '@appServices';
import { LoginRequest, RegisterRequest } from '@appTypes';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import { configs } from '@appConfig';
import jsonwebtoken from 'jsonwebtoken';
import { ApiError } from '@appErrors';

export class AuthController {
  static async register(req: RegisterRequest, res: Response): Promise<void> {
    const { username, password } = req.body;
    const created = await UserService.create({
      username,
      password: await bcrypt.hash(password, 10)
    });

    if (created) {
      res
        .status(httpStatus.CREATED)
        .json({ message: 'User created successfully. Use your username and password to log in.' })
        .redirect('/auth/login');
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken.');
    }
  }

  static async login(req: LoginRequest, res: Response): Promise<void> {
    const { username, password } = req.body;
    const user = await UserService.getUserByUsername(username);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid username.');
    } else {
      const authorized = await bcrypt.compare(password, user.password);

      if (authorized) {
        res
          .status(httpStatus.OK)
          .json({ message: 'login successful' })
          .cookie('jwt', this.getJwtToken(user.id), {
            httpOnly: true,
            maxAge: configs.jwtDurationMin * 60
          })
          .redirect('/stocks/home');
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password.');
      }
    }
  }
  private static async getJwtToken(userId: string) {
    const expiresIn = configs.jwtDurationMin * 60;

    return jsonwebtoken.sign({ userId }, configs.jwtSecret, { expiresIn });
  }
}
