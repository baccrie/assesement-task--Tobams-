import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

export default function notFound(req: Request, res: Response):void {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: "Oops, the endpoint doesn't exist..."
  })
}