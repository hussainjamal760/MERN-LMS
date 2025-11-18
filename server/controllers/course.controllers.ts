import {Request , Response , NextFunction} from 'express'
import ErrorHandler from "../utils/ErrorHandler"
import {CatchAsyncError} from "../middleware/CatchAsyncErrors"
import cloudinary from "cloudinary"
import { createCourse } from '../services/course.service'
import CourseModel from '../models/course.model'
import { redis } from '../utils/redis'
import mongoose from 'mongoose'
import path from 'path'
import ejs from 'ejs'
import sendMail from '../utils/sendMail'



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



export const editCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if(thumbnail){
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            })

            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        
        const courseId= req.params.id;

        const course = await CourseModel.findByIdAndUpdate(
            courseId,{
                $set:data,
            },
            {new:true}
        )

        res.status(201).json({
            success:true,
            course,
        })


    } catch (error:any) {
        return next(new ErrorHandler(error.message , 400))
    }
})



export const getAllCourses = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isCacheExist = await redis.get("allCourses");
          if(isCacheExist){
            const courses = JSON.parse(isCacheExist)
            res.status(200).json({
            success:true,
            courses
        })
    }else{
        const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links")

        await redis.set("allCourses" , JSON.stringify(courses))

        res.status(200).json({
            success:true,
            courses
        })
    }
}catch (error:any) {
        return next(new ErrorHandler(error.message , 400))
    }
})

export const getSingleCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const courseId = req.params.id;
        const isCacheExist = await redis.get(courseId);

        if(isCacheExist){
            const course = JSON.parse(isCacheExist)
            res.status(200).json({
            success:true,
            course
        })
        }else{
        const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links")

        await redis.set(courseId , JSON.stringify(course))
        
        res.status(200).json({
            success:true,
            course
        })
    }
    } catch (error:any) {
        return next(new ErrorHandler(error.message , 400))
    }
})



export const getCourseByUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const courseExists = userCourseList?.find(
            (course:any)=> course._id.toString()=== courseId
        )

        if(!courseExists){
            return next(new ErrorHandler("You are not enrolled to access this course" , 404))
        }

        const course = await CourseModel.findById(courseId)
        const content = course?.courseData;

         res.status(200).json({
            success:true,
            content
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message , 500))
    }
})

interface IAddQuestionData{
    question:string,
    courseId:string,
    contentId:string
}

export const addQuestion = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {question , contentId, courseId}:IAddQuestionData = req.body;
        const course=await CourseModel.findById(courseId)

        if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next(new ErrorHandler("Invalid Content id" , 400))
        }

        const courseContent = course?.courseData?.find((item:any)=>item._id.equals(contentId))

        if(!courseContent){
        return next(new ErrorHandler("Invalid Content id" , 400))
        }

        const newQuestion:any={
            user:req.user,
            question,
            questionReplies:[]
        }

        courseContent.questions.push(newQuestion)

        await course?.save()

        res.status(200).json({
            success:true,
            course
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message , 500))
    }
})




interface IAddAnswerData{
    answer:string,
    courseId:string,
    contentId:string,
    questionId:string,
}

export const addAnswer = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {answer , contentId, courseId , questionId}:IAddAnswerData = req.body;
        const course=await CourseModel.findById(courseId)

        if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next(new ErrorHandler("Invalid Content id" , 400))
        }

        const courseContent = course?.courseData?.find((item:any)=>item._id.equals(contentId))

        if(!courseContent){
        return next(new ErrorHandler("Invalid Content id" , 400))
        }

        const question = courseContent?.questions?.find((item:any)=>
            item._id.equals(questionId)
        )

        if(!question){
            return next(new ErrorHandler("invalid question id" , 500))
        }
        
        const newAnswer:any={
            user:req.user,
            answer,
        }

        question.questionReplies.push(newAnswer)
        await course?.save()
  console.log("QUESTION:", question);
console.log("QUESTION USER:", question.user);
console.log("ALL QUESTIONS:", courseContent.questions);


        if (req.user?._id.toString() === question.user._id.toString()) {
            //notification
        }else{
            const data = {
                name:question.user.name,
                title:courseContent.title,
            }
            const html =await ejs.renderFile(path.join(__dirname,"../mails/question-reply.ejs"),data)

            
            try {
                await sendMail({
                    email:question.user.email,
                    subject:"Question-reply",
                    template:"question-reply.ejs",
                    data,
                })
            } catch (error:any) {
                return next(new ErrorHandler(error.message , 500))
            }

            console.log("QUESTION:", question);
console.log("QUESTION USER:", question.user);
console.log("ALL QUESTIONS:", courseContent.questions);


            res.status(200).json({
                success:true,
                course
            })
        }

    } catch (error:any) {
        return next(new ErrorHandler(error.message , 500))
    }
})