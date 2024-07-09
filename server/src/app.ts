import express, { Request as Req, Response as Res, NextFunction as Next } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { ApiError, errorHandler } from '@appErrors';
import { router } from '@appRoutes';

/**
 * Creating the app and adding the middlewares.
 */
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/**
 * Setting up routes.
 */
app.use('/', router);

// Not found handler - stack trace is not to be populated for this, instead url is shown.
app.use((req: Req, res: Res, next: Next) =>
  next(new ApiError(httpStatus.NOT_FOUND, 'Resource Not Found: ', req.url))
);

// Handler for errors thrown by async routers.
// This handler has 4 parameters instead of 3 - that's how express knows when to call this.
app.use(errorHandler);

export { app };
