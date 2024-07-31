import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ICustomError from '../interface/error';

export default function errorHandler(error: ICustomError, req: Request, res: Response, next: NextFunction) {
  
  let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = error.message || 'Something went wrong';

  if (error.name === 'ValidationError') {
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(',');
  statusCode = StatusCodes.BAD_REQUEST;
  }

  if (error.code && error.code === 11000) {
    message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    statusCode = StatusCodes.BAD_REQUEST;
  }

  if (error.name === 'CastError') {
    console.log('cast error')
  message = `Book with ID ${error.value} does not exist.
`;
    statusCode = StatusCodes.NOT_FOUND
  }

  const start: Boolean = `${statusCode}`.startsWith('4')
  res.status(statusCode).json({
    status: `${start ? 'error' : 'fail'}`,
    msg: message
  });
}