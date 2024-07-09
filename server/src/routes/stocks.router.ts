import { Router } from 'express';
import { paramSaveReqValidator } from '@appMiddlewares';
import { asyncErrorWrapper } from '../errors';
import { StockController } from '@appControllers';

const stockRouter = Router();

stockRouter.post('/add/:stockId', asyncErrorWrapper(StockController.addStockToUser));
stockRouter.post('/rmv/:stockId', asyncErrorWrapper(StockController.rmvStockFromUser));
stockRouter.post('/all', asyncErrorWrapper(StockController.getDataForAllStocksForUser));
stockRouter.post('/home'); // render home UI.
stockRouter.post('/:stockId', asyncErrorWrapper(StockController.searchStock));

export { stockRouter };
