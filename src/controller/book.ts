import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book, { IBook } from '../model/book.js'

export async function getAllBooks(_req: Request, res: Response, next: NextFunction){
    try {
    const allBooks = await Book.find()
    res.status(StatusCodes.OK).json({
      msg: 'get all books'
    })
  } catch(err) {
    next(err)
  }
}


export async function getSingleBook(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(StatusCodes.OK).json({
      msg: 'get one book'
    })
  } catch(err) {
    next(err)
  }
}

export async function createBook(_req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).json({
    msg: 'create book'
  })
}

export async function updateBook(_req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).json({
    msg: 'update book'
  })
}

export async function deleteBook(_req: Request, res: Response, next: NextFunction)  {
  res.status(StatusCodes.OK).json({
    msg: 'delete a book'
  })
}

export async function updateCoverPicture(_req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).json({
    msg: 'update cover image'
  })
}
