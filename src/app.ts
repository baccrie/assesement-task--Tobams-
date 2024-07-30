import express from 'express'
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'

dotenv.config({path: './.env'})
const app = express()

const PORT: any = process.env.PORT || 8000

app.listen((PORT: any) => console.log(`server is running on port ${PORT}`))