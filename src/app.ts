//node modules
import express from 'express'
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'

// self modules
import connectDB from './db/connect.js'
import router from './router/book.js'

dotenv.config({path: './.env'})
const app = express()

// built-in middlewares
app.use(express.json())


// Check app status
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "app working...."
  })
})

// mount book router for CRUD
app.use('/books', router)
// app.use()  // not found
// app.use()  // error handler

const PORT: number = parseInt(process.env.PORT as string) || 8000;

(async function start() {
  await connectDB(`${process.env.MONGO_URL}`)
  app.listen(PORT, ()=> {
    console.log(`app is listening to port ${PORT}...`)
  })
})()