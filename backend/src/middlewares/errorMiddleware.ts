import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
}