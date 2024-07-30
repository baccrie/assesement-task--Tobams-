import express from 'express'
import {getAllBooks, getSingleBook, updateBook, createBook, deleteBook, updateCoverPicture} from '../controller/book.js'

const router = express.Router()

// CREATE
router.post('/', createBook)

// READ
router.get('/:id', getSingleBook)
router.get('/', getAllBooks)

// UPDATE
router.put('/:id', updateBook)
router.patch('/cover-image/:id', updateCoverPicture)

// DELETE
router.delete('/:id', deleteBook)

export default router