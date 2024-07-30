import express from 'express'
import {getAllBooks, getSingleBook, updateBook, createBook, deleteBook, updateCoverPicture} from '../controller/book.js'

const router = express.Router()


router.get('/:id', getSingleBook)
router.get('/', getAllBooks)

router.post('/', createBook)

router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

router.patch('/cover-image/:id', updateCoverPicture)
