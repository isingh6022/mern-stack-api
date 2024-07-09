import { Router } from 'express';
import { stockRouter } from './stocks.router';
import { authRoutes } from './auth.routes';
import { loginVarification } from '@appMiddlewares';

const router = Router();
router.use('/auth', authRoutes);
router.use('/stocks', loginVarification, stockRouter);

export { router };
