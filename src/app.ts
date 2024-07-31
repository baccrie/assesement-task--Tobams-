//node modules
import express from 'express'
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import openApiDocumentation from './docs.json'



// self modules
import connectDB from './db/connect'
import router from './router/book'
import notFound from './controller/notFound'
import errorHandler from './controller/errorHandler'


dotenv.config({path: './.env'})
const app = express()


// built-in middlewares
app.use(express.json());
app.use(express.static('./public'))

// Set up file upload middleware
app.use(fileUpload())


// swagger  docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));


// Check app status
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "app working...."
  })
})

// mount book router for CRUD
app.use('/books', router)
app.all('*', notFound)  // not found
app.use(errorHandler)  // error handler

const PORT: number = parseInt(process.env.PORT as string) || 8000;

(async function start() {
  await connectDB(`${process.env.MONGO_URL}`)
  app.listen(PORT, ()=> {
    console.log(`app is listening to port ${PORT}...`)
  })
})()

export default app