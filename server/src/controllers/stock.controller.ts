import { StockService, UserService } from '@appServices';
import { Stock, StockRequest } from '@appTypes';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export class StockController {
  static async searchStock(req: Request & StockRequest, res: Response) {
    const stock = await StockService.getStockData(req.params.stockId);

    if (!stock) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Stock matching the given id was not found.' });
    } else {
      res.status(httpStatus.OK).json({ stock });
    }
  }
}
