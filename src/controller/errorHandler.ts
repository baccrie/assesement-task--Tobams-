import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ICustomError from '../interface/error';

export default function errorHandler(
  error: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Default to internal server error
  let statusCode: number = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = error.message || 'Something went wrong';

  // Handle ValidationError
  if (error.name === 'ValidationError') {
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
    statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle duplicate key error (MongoDB)
  if (error.code === 11000) {
    message = `Duplicate value entered for ${Object.keys(error.keyValue).join(', ')} field, please choose another value`;
    statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle CastError (e.g., invalid ObjectId)
  if (error.name === 'CastError') {
    message = `Book with ID ${error.value} does not exist.`;
    statusCode = StatusCodes.NOT_FOUND;
  }

  const start: boolean = `${statusCode}`.startsWith('4');
  res.status(statusCode).json({
    status: `${start ? 'error' : 'fail'}`,
    msg: message
  });
}