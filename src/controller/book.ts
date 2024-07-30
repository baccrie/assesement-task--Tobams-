import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book from '../model/book.js'
import IBook from '../interface/model.js';

import BadRequestError from "../error/badRequest.js";
import NotFoundError from "../error/notFound.js";

export async function getAllBooks(_req: Request, res: Response, next: NextFunction){
    try {
    // 1.) Find all books
    const allBooks = await Book.find()

    //2.) check if any book exist
    if (allBooks.length === 0) {
      throw new NotFoundError('No book found')
    }

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
    console.log(id)

    // 1.) find book
    const book = await Book.findById(req.params.id)

    // 2.) check book existence
    if (!book) {
      throw new NotFoundError(`No book found with id... ${id}`)
    }
    
    res.status(StatusCodes.OK).json({
      data: book
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

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) get id from params
    const {params: id, body: payload} = req 

    // 2.) check if book with id exists
    let book = await Book.findById(id)

    // 3.) handle errors
    if (!book) {
      throw new NotFoundError('Book with id dosent exist')
    }

    // 4.) return res
    book = await Book.findOneAndUpdate({_id: id}, payload, {
      runValidators: true,
      new: true
    })
    
    res.status(StatusCodes.OK).json({
      msg: 'update book'
    })
  } catch(err) {
    next(err)
  }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction)  {
  try {
    // 1.) check if book exists
    const {params: id} = req

    // 1.) find book
    const book = await Book.findById(req.params.id)

    // 2.) check book existence
    if (!book) {
      throw new NotFoundError('No book with such id')
    }

    // 3.) delete book cover images

    // 4.) Delete Book
    await Book.findByIdAndDelete(req.params.id)
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
