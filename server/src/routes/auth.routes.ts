import { Router } from 'express';
import { AuthController } from '@appControllers';
import { loginReqValidator, registerReqValidator } from '@appMiddlewares';
import { asyncErrorWrapper } from '../errors';

const authRoutes = Router();

authRoutes.post('/register', registerReqValidator, asyncErrorWrapper(AuthController.register));
authRoutes.post('/login', loginReqValidator, asyncErrorWrapper(AuthController.login));

export { authRoutes };
