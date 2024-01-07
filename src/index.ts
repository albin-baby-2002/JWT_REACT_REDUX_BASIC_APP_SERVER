import express from "express";
const app = express();

import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors';
import path from "path";
import mongoose from "mongoose";
import { Request,Response,NextFunction } from "express";
import cookieParser from 'cookie-parser';

import connectDB from "./config/dbConnection";
import corsOptions from "./config/corsOptions";
import verifyJWT from "./middlewares/jwtVerification";
import errorHandler from "./middlewares/errorHandler";
import authRouter from './routes/authRoutes/authRoute';
import logoutRouter from "./routes/authRoutes/LogoutRoute";
import RefreshRouter from "./routes/authRoutes/refreshRoute";
import registerRouter from "./routes/authRoutes/registerRoute";
import credentials from "./middlewares/credentials";
import Usersrouter from "./routes/adminRoutes/userCRUD";

const PORT = process.env.PORT || 3500;

// connect to mongodb database

connectDB()

// access-control-allow-credentials 

app.use(credentials)

// cross origin resource sharing

app.use(cors(corsOptions))

// parse cookies 

app.use(cookieParser())

// parse json data from request

app.use(express.json())

// server static files from public folder

app.use(express.static(path.join(__dirname,'/public')))

// register router

app.use('/register',registerRouter)

// auth router 

app.use('/auth',authRouter)

// refresh access token router 

app.use('/refresh',RefreshRouter)

// logout router


app.use('/logout',logoutRouter)

// authenticate users using jwt for private routes

app.use(verifyJWT)


app.use('/users',Usersrouter)


app.use('/em' , (req,res,next)=>{
  
  return res.status(200).json({'hello':'hi'})
}
  

)

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




