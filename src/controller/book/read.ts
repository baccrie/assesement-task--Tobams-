import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book from '../../model/book'

import NotFoundError from "../../error/notFound";



export async function getAllBooks(_req: Request, res: Response, next: NextFunction){
  try {
  // 1.) Find all books
  const allBooks = await Book.find()

  //2.) check if any book exist
  if (allBooks.length === 0 || !allBooks) {
    throw new NotFoundError('No book found!')
  }

  res.status(StatusCodes.OK).json(allBooks)
} catch(err) {
  next(err)
}
}


export async function getSingleBook(req: Request, res: Response, next: NextFunction) {
try {
  const { 
    params: {
    id
  }} = req

  // 1.) find, or throww error if book dosent exist
  const book = await Book.checkBook(id)
  
  res.status(StatusCodes.OK).json(book)
} catch(err) {
  next(err)
}
}
