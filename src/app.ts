//node modules
import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import { StatusCodes } from 'http-status-codes'
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import openApiDocumentation from './docs.json'
import cors from 'cors'
import mongoSanitize from "express-mongo-sanitize";
import helmet from 'helmet';

// self modules
import connectDB from './db/connect'
import router from './router/book'
import notFound from './controller/notFound'
import errorHandler from './controller/errorHandler'

dotenv.config({path: './.env'})
const app = express()

// built-in middlewares

// security packages
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())

// others
app.use(express.json());
app.use(express.static('./public'))

// Set up file upload middleware
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,  // Abort the request if the file exceeds the limit
}));

// swagger  docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// Check app status
app.get('/', (req: Request, res: Response) => {
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
  try {
    await connectDB(`${process.env.MONGO_URL}`);
    app.listen(PORT, () => {
      console.log(`app is listening to port ${PORT}...`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
})()

export default app