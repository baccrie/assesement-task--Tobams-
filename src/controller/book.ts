import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';


export function getAllBooks(_req: Request, res: Response){
  res.status(StatusCodes.OK).json({
    msg: 'get all books'
  })
}

export function getSingleBook(_req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    msg: 'get one book'
  })
}

export function createBook(_req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    msg: 'create book'
  })
}

export function updateBook(_req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    msg: 'update book'
  })
}

export function deleteBook(_req: Request, res: Response)  {
  res.status(StatusCodes.OK).json({
    msg: 'delete a book'
  })
}

export function updateCoverPicture(_req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    msg: 'update cover image'
  })
}
