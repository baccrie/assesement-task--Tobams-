//node modules
import express from 'express'
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'

// self modules
import connectDB from './db/connect.js'

dotenv.config({path: './.env'})
const app = express()

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "app working...."
  })
})

const PORT: number = parseInt(process.env.PORT as string) || 8000;

(async function start() {
  await connectDB(`${process.env.MONGO_URL}`)
  app.listen(PORT, ()=> {
    console.log(`app is listening to port ${PORT}...`)
  })
})()