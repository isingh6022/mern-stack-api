import { Router } from 'express';
import { asyncErrorWrapper } from '../errors';
import { StockController } from '@appControllers';
import { stockReqValidator } from '@appMiddlewares';

const stockRouter = Router();

// stockRouter.post('/add', asyncErrorWrapper(StockController.addStockToUser));
// stockRouter.post('/rmv', asyncErrorWrapper(StockController.rmvStockFromUser));
// stockRouter.post('/all', asyncErrorWrapper(StockController.getDataForAllStocksForUser));
// stockRouter.post('/home'); // render home UI.
stockRouter.post('/:stockId', stockReqValidator, asyncErrorWrapper(StockController.searchStock));

export { stockRouter };
