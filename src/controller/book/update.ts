import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs'

import Book from '../../model/book'

import BadRequestError from "../../error/badRequest";
import NotFoundError from "../../error/notFound";
import { UpdateBook } from '../../validate/book';
import  { UploadedFile } from 'express-fileupload';



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


export async function updateCoverPicture(req: Request, res: Response, next: NextFunction) {
  try {

   const { id } = req.params;

      // 1.) Check if book exists
      const book = await Book.findById(id);
      if (!book) {
        throw new NotFoundError(`Book with ID ${id} does not exist...`);
      }

   // 2.) Check if file is uploaded
   if (!req.files || !req.files.coverImage) {
     throw new BadRequestError('No file uploaded');
   }

   // 3.) Get the uploaded file from file upload
   const file = req.files.coverImage as UploadedFile;

   // 4.) Validate file type
   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
   if (!allowedTypes.includes(file.mimetype)) {
     throw new BadRequestError('Invalid file type. Only JPEG, PNG, and JPG files are allowed.');
   }

   const extension = path.extname(file.name)
   // 5.) Define file path
   const uploadPath = path.join(__dirname, '../../public/img', `${book.ISBN}${extension}`);


   // 6.) check if folder exists
   const uploadDir = path.join(__dirname, '../../public/img');
   if (!fs.existsSync(uploadDir)) {
     fs.mkdirSync(uploadDir, { recursive: true });
   }

   // 7.) Move the file to the desired directory
   file.mv(uploadPath, async (err) => {
     if (err) {
       return next(err);
     }

    // 8.) Delete old cover picture from public
    if (book.coverImage && fs.existsSync(book.coverImage)) {
      fs.unlinkSync(book.coverImage)
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