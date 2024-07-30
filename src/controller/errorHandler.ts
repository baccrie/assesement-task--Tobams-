import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ICustomError from '../interface/error.js';

export default function errorHandler(error: ICustomError, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.msg || 'Something went wrong';

  console.log(error)
  res.status(statusCode).json({
    status: 'error',
    msg: message
  });
}