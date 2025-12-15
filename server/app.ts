import express , {NextFunction , Request , Response} from "express";
export const app = express();
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from './middleware/error'
import userRouter from "./routes/user.route"
import courseRouter from "./routes/course.route"
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import { rateLimit } from 'express-rate-limit'

app.use(express.json({limit:"50mb"}));

app.use(cors({
    origin: process.env.ORIGIN || 'https://sheep-academy-v1.onrender.com',
    credentials: true 
}));
app.use(cookieParser())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false, 
    ipv6Subnet: 56, 
})

app.get("/test" ,(req:Request,res:Response , next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is Working",
    })
})

app.use('/api/v1' , userRouter)

app.use('/api/v1' , courseRouter)

app.use('/api/v1' , orderRouter)

app.use('/api/v1' , notificationRouter)

app.use('/api/v1' , analyticsRouter)

app.use('/api/v1' , layoutRouter) 

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not Found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(limiter)

app.use(ErrorMiddleware)