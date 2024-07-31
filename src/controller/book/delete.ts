import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book from '../../model/book'

import NotFoundError from "../../error/notFound";

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) Get the book ID from the request parameters
    const { id } = req.params;

    // 2.) Find and delete the book by its ID
    const book = await Book.findOneAndDelete({ _id: id });

    // 3.) Check if the book exists
    if (!book) {
      throw new NotFoundError(`Book with ID ${id} does not exist.`);
    }

    // Check if coverImage exists and delete
    // if (book.coverImage && typeof book.coverImage === 'string') {
    //   fs.unlinkSync(book.coverImage);
    // }

    // 4.) Respond with success message
    res.status(StatusCodes.OK).json({
      msg: 'Book successfully deleted',
    });
  } catch (err) {
    next(err);
  }
}
