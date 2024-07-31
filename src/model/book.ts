import { Schema, model, Model } from "mongoose";
import NotFoundError from "../error/notFound";
import IBook from "../interface/model";


interface IBookModel extends Model<IBook> {
  checkBook(id: string): Promise<IBook | null>;
}

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    minLength: [5, 'title too short'],
    trim: true
  },

  author: {
    type: String,
    required: [true, 'Please provide an author'],
    minLength: [5, 'author name too short'],
    trim: true

  },

    published_date: {
      type: Date,
      required: [true, 'Please provide a date']
    },

    ISBN: {
      type: String,
      required: [true, 'Please provide ISBN'],
      unique: [true, 'Book with ISBN already exists']
    },

    coverImage: {
      type: String,
    }
})

// presave hook
BookSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('published_date')) {
    this.published_date = new Date(this.published_date);
  }
  next();
});

// static method to implement the DRY principle in controllers
BookSchema.statics.checkBook = async function (id) {
  const book = await this.findById(id)
  if (!book) throw new NotFoundError(`book with ${id} dosent exist`)
  return book
}

const Book: IBookModel = model<IBook, IBookModel>('Book', BookSchema);

export default Book