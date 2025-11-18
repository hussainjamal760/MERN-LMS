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
import userModel from '../models/user.model'



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
        
        console.log("=== ADD QUESTION DEBUG ===");
        console.log("Request user:", req.user);
        console.log("Request user ID:", req.user?._id);
        console.log("Question text:", question);
        console.log("Content ID:", contentId);
        console.log("Course ID:", courseId);
        
        if(!req.user || !req.user._id){
            return next(new ErrorHandler("User not authenticated" , 401))
        }
        
        const course = await CourseModel.findById(courseId)

        if(!course){
            return next(new ErrorHandler("Course not found" , 404))
        }

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid Content id" , 400))
        }

        const courseContent = course?.courseData?.find((item:any)=>item._id.equals(contentId))

        if(!courseContent){
            return next(new ErrorHandler("Invalid Content id" , 400))
        }

        // Create new question with explicit ObjectId
        const newQuestion = {
            user: new mongoose.Types.ObjectId(req.user._id.toString()),
            question: question,
            questionReplies: []
        }

        console.log("New question object:", newQuestion);
        console.log("Type of user field:", typeof newQuestion.user);

        courseContent.questions.push(newQuestion as any)

        console.log("Questions array after push:", courseContent.questions);

        await course.save()

        console.log("Course saved successfully");

        // Fetch fresh to verify
        const verifyCourse = await CourseModel.findById(courseId);
        const verifyContent = verifyCourse?.courseData?.find((item:any)=>item._id.equals(contentId));
        const lastQuestion = verifyContent?.questions[verifyContent.questions.length - 1];
        console.log("Last saved question:", JSON.stringify(lastQuestion, null, 2));

        res.status(200).json({
            success:true,
            course
        })
    } catch (error:any) {
        console.log("addQuestion error:", error);
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
        
        const course = await CourseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("Course not found" , 404))
        }

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid Content Id" , 400))
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
        
        // Debug: Check what's in question.user
        console.log("Question object:", JSON.stringify(question, null, 2));
        console.log("Question user:", question.user);
        console.log("Type of question.user:", typeof question.user);
        
        if(!question.user){
            return next(new ErrorHandler("Question user not found" , 500))
        }
        
        const newAnswer:any={
            user: req.user?._id,
            answer,
        }

        question.questionReplies.push(newAnswer)
        await course?.save()

        // Handle both old format (full object) and new format (ObjectId)
        let questionUser;
        let questionUserId;
        
        // Cast to any to check the actual runtime value
        const userField: any = question.user;
        
        // Check if it's an ObjectId (string representation or ObjectId instance)
        if (typeof userField === 'string' || userField instanceof mongoose.Types.ObjectId) {
            // New format: user is stored as ObjectId
            questionUserId = userField.toString();
            questionUser = await userModel.findById(questionUserId);
        } else if (userField && userField._id) {
            // Old format: user is stored as full object
            questionUserId = userField._id.toString();
            questionUser = userField;
        } else {
            console.log("Unknown user format:", userField);
            return next(new ErrorHandler("Invalid question user format" , 500))
        }

        if(!questionUser){
            return next(new ErrorHandler("Question user not found in database" , 500))
        }

        if (req.user?._id.toString() === questionUserId) {
            //notification
            console.log("Same user - no email sent")
        } else {
            const data = {
                name: questionUser.name,
                title: courseContent.title,
            }

            try {
                await sendMail({
                    email: questionUser.email,
                    subject: "Question-reply",
                    template: "question-reply.ejs",
                    data,
                })
                console.log("Email sent successfully to:", questionUser.email);
            } catch (error:any) {
                console.log("Email sending error:", error);
                return next(new ErrorHandler(error.message , 500))
            }
        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (error:any) {
        console.log("Full error:", error);
        return next(new ErrorHandler(error.message , 500))
    }
})

interface IAddReviewData{
    review:string,
    rating:number,
    userId:string,
}

export const addReview =CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userCourseList = req.user?.courses

        const courseId = req.params.id

        const courseExists = userCourseList?.some((course:any)=>course._id.toString() === courseId.toString())

        if(!courseExists){
        return next(new ErrorHandler("You are not enrolled in this course" , 404))
        }

        const course = await CourseModel.findById(courseId)

        const {review ,rating} = req.body as IAddReviewData

        const reviewData:any={
            user:req.user,
            rating,
            comment:review,
        }

        course?.reviews.push(reviewData)

        let avg = 0;

        course?.reviews.forEach((rev:any)=>{
            avg+=rev.rating;
        })

        if(course){
            course.ratings = avg /course.reviews.length
        }

        await course?.save()

        const notification = {
            title:"New Review Received",
            message:`${req.user?.name} has given a review in ${course?.name}`
        }

        res.status(200).json({
            success:true,
            course
        })

    } catch (error:any) {
        console.log("Full error:", error);
        return next(new ErrorHandler(error.message , 500))
    }
})