import {Request , Response , NextFunction} from 'express'
import ErrorHandler from "../utils/ErrorHandler"
import {CatchAsyncError} from "../middleware/CatchAsyncErrors"
import cloudinary from "cloudinary"
import { createCourse } from '../services/course.service'


export const uploadCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if(thumbnail){
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            })

            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        createCourse(data,res,next)


    } catch (error:any) {
        return next(new ErrorHandler(error.message , 400))
    }
})
