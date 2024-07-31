import express from 'express'
import { getAllBooks, getSingleBook } from '../controller/book/read'
import {createBook} from '../controller/book/create'
import { updateBook, updateCoverPicture } from '../controller/book/update'
import { deleteBook } from '../controller/book/delete'

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