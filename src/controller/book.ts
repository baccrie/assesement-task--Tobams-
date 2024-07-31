import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book from '../model/book'

import BadRequestError from "../error/badRequest";
import NotFoundError from "../error/notFound";
import { UpdateBook, CreateBook } from '../validate/book';
import  { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs'




export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) get payload
    const {body: payload} =  req

    // 2.) validate payload
    const { error, value: validatedPayload } = CreateBook.validate(payload)
    if (error) {
      console.log('joi error')
      throw new BadRequestError(`${error.details[0].message}`)
    }

    // 3.) create new Book
    const newBook = await Book.create(validatedPayload)

    // 4.) response 
    res.status(StatusCodes.CREATED).json(newBook)
  } catch(err) {
    next(err)
  }
}

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

    // 1.) find book
    const book = await Book.findById(id)

    // 2.) check book existence
    if (!book) {
      throw new NotFoundError(`book with ${id} dosent exist`)
    }
    
    res.status(StatusCodes.OK).json(book)
  } catch(err) {
    next(err)
  }
}


export async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1a.) get id from params
    const {params: {id}, body: payload} = req 

    // 1b. payload validation
    const { error, value: validatedPayload } = UpdateBook.validate(payload)
    if (error) {
      throw new BadRequestError(`${error.details[0].message}`)
    }

    // 2.) check, validate and update
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, validatedPayload, {
      runValidators: true,
      new: true
    });

    
    if (!updatedBook) {
      throw new NotFoundError(`Book with ID ${id} does not exist.`);
    }
 
    res.status(StatusCodes.OK).json(updatedBook)
  } catch(err) {
    next(err)
  }
}

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

export async function updateCoverPicture(req: Request, res: Response, next: NextFunction) {
   try {

    const { id } = req.params;

       // Check if book exists
       const book = await Book.findById(id);
       if (!book) {
         throw new NotFoundError(`Book with ID ${id} does not exist...`);
       }

    // Check if file is uploaded
    if (!req.files || !req.files.coverImage) {
      throw new BadRequestError('No file uploaded');
    }

    // Get the uploaded file
    const file = req.files.coverImage as UploadedFile;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestError('Invalid file type. Only JPEG, PNG, and JPG files are allowed.');
    }

    // Define file path
    const uploadPath = path.join(__dirname, '../public/img', `${Date.now()}-${file.name}`);

    console.log(uploadPath)

    // check if folder exists
    const uploadDir = path.join(__dirname, '../public/img');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Move the file to the desired directory
    file.mv(uploadPath, async (err) => {
      if (err) {
        return next(err);
      }

      // Update book with the new cover image path
      book.coverImage = uploadPath;
      await book.save();

      res.status(StatusCodes.OK).json({
        msg: 'Cover image updated successfully',
        data: book
      });
    });
   }catch (err) {
      next(err);
    }
  }