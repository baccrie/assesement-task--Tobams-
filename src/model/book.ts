import { Schema, model } from "mongoose";
import IBook from "../interface/model.js";

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    minLength: [5, 'title too short'],
  },

  author: {
    type: String,
    required: [true, 'Please provide an author'],
    minLength: [5, 'author name too short'],

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
      // unique: [true, 'duplicate cover image name'],
    }
})


BookSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('published_date')) {
    this.published_date = new Date(this.published_date);
  }
  next();
});

export default model('Book', BookSchema)