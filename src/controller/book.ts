import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book, { IBook } from '../model/book.js'

export async function getAllBooks(_req: Request, res: Response, next: NextFunction){
    try {
    // 1.) Find all books
    const allBooks = await Book.find()

    res.status(StatusCodes.OK).json({
      data: allBooks
    })
  } catch(err) {
    next(err)
  }
}


export async function getSingleBook(req: Request, res: Response, next: NextFunction) {
  try {
    const {params: id} = req

    const book = await Book.findById(id)
    res.status(StatusCodes.OK).json({
      msg: 'get one book'
    })
  } catch(err) {
    next(err)
  }
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) get payload
    const payload =  req.body

    // 2.) validate payload

    // 3.) create new Book
    const newBook = await Book.create(payload)
    // 4.) response 
    res.status(StatusCodes.OK).json({
      msg: 'create book'
    })
  } catch(err) {
    next(err)
  }
}

export async function updateBook(_req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) get id from params

    // 2.) check if book with id exists

    // 3.) handle errors

    // 4.) return res
    res.status(StatusCodes.OK).json({
      msg: 'update book'
    })
  } catch(err) {
    next(err)
  }
}

export async function deleteBook(_req: Request, res: Response, next: NextFunction)  {
  try {
    // 1.) check if book exists

    // 2.) Handle book errors

    // 3.) delete book cover images

    // 4.) Delete Book

    // 5.) Return response
  res.status(StatusCodes.OK).json({
    msg: 'delete a book'
  })
} catch(err) {
  next(err)
}
}

export async function updateCoverPicture(_req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) extract id from req

    // 2.) check if book exists

    // 3.) update Book Cover

    // 4.) return response
    res.status(StatusCodes.OK).json({
      msg: 'update cover image'
    })
  } catch(err) {
    next(err)
  }
}
