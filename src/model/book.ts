import { Schema, model } from "mongoose";


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
      unique: [true, 'duplicate cover image name'],
    }
})

export default model('Book', BookSchema)