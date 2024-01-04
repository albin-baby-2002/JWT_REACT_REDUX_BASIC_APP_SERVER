import express from "express";
const app = express();

import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import path from "path";
import mongoose from "mongoose";
import { Request,Response,NextFunction } from "express";
import cookieParser from 'cookie-parser'

import authRouter from './routes/authRoute'
import connectDB from "./config/dbConnection";
import corsOptions from "./config/corsOptions";
import registerRouter from "./routes/registerRoute";
import errorHandler from "./middlewares/errorHandler";

const PORT = process.env.PORT || 3500;

// connect to mongodb database

connectDB()

// cross origin resource sharing

app.use(cors(corsOptions))

// parse cookies 

app.use(cookieParser())

// parse json data from request

app.use(express.json())

// server static files from public folder

app.use(express.static(path.join(__dirname,'/public')))

// register route

app.use('/register',registerRouter)

// auth router 

app.use('/auth',authRouter)

// 404 Error Middleware

app.use('*',(req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler

app.use(errorHandler)

// running the server application

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});




