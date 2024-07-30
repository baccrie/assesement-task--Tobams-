import express from 'express'
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'

dotenv.config({path: './.env'})
const app = express()

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "app working...."
  })
})

console.log(typeof process.env.PORT)

const PORT: number = parseInt(process.env.PORT as string) || 8000

app.listen(PORT, ()=> {
  console.log(`app is listening to port ${PORT}...`)
})