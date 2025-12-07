import {Request , Response , NextFunction} from 'express'
import ErrorHandler from "../utils/ErrorHandler"
import {CatchAsyncError} from "../middleware/CatchAsyncErrors"
import cloudinary from "cloudinary"
import { createCourse, getAllCoursesService } from '../services/course.service'
import CourseModel from '../models/course.model'
import { redis } from '../utils/redis'
import mongoose from 'mongoose'
import path from 'path'
import ejs from 'ejs'
import sendMail from '../utils/sendMail'
import userModel from '../models/user.model'
import NotificationModel from '../models/notification.model'
import axios from 'axios'



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



export const getAllCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
          
        const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links")

        res.status(200).json({
            success:true,
            courses
        })
    
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

        await redis.set(courseId , JSON.stringify(course), "EX" , 604800)
        
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

        const newQuestion = {
            user: new mongoose.Types.ObjectId(req.user._id.toString()),
            question: question,
            questionReplies: []
        }

       
        courseContent.questions.push(newQuestion as any)

        await NotificationModel.create({
            user:req.user?._id,
            title:"New question received",
            message:`You have a new question in ${courseContent.title}`,
        })

        await course?.save()


        // Fetch fresh to verify
        const verifyCourse = await CourseModel.findById(courseId);
        const verifyContent = verifyCourse?.courseData?.find((item:any)=>item._id.equals(contentId));
        const lastQuestion = verifyContent?.questions[verifyContent.questions.length - 1];

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
        
     
        if(!question.user){
            return next(new ErrorHandler("Question user not found" , 500))
        }
        
        const newAnswer:any={
            user: req.user?._id,
            answer,
        }

        question.questionReplies.push(newAnswer)
        await course?.save()

        let questionUser;
        let questionUserId;
        
        const userField: any = question.user;
        
        if (typeof userField === 'string' || userField instanceof mongoose.Types.ObjectId) {
            questionUserId = userField.toString();
            questionUser = await userModel.findById(questionUserId);
        } else if (userField && userField._id) {
            questionUserId = userField._id.toString();
            questionUser = userField;
        } else {
            return next(new ErrorHandler("Invalid question user format" , 500))
        }

        if(!questionUser){
            return next(new ErrorHandler("Question user not found in database" , 500))
        }

        if (req.user?._id.toString() === questionUserId) {
            await NotificationModel.create({
            user:req.user?._id,
            title:"New question reply received",
            message:`You have a new question reply in ${courseContent.title}`,
        })
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
            } catch (error:any) {
                return next(new ErrorHandler(error.message , 500))
            }
        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (error:any) {
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
        return next(new ErrorHandler(error.message , 500))
    }
})

interface IAddReviewData{
    comment:string,
    courseId:string,
    reviewId:string,
}

export const addReplyToReview =CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try { 

        const {comment , courseId , reviewId} = req.body as IAddReviewData

        const course = await CourseModel.findById(courseId)

        if(!course){
            return next(new ErrorHandler("Course not found" , 404))
        }

        const review = course?.reviews?.find(
            (rev:any)=>rev._id.toString()===reviewId
        )

        if(!review){
            return next(new ErrorHandler("Review not found" , 404))
        }

        const replyData :any = {
            user:req.user,
            comment,
        }

        if(!review.commentReplies){
            review.commentReplies = []
        }

        review.commentReplies?.push(replyData);

        await course?.save();

        res.status(200).json({
            success:true,
            course
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message , 500))
    }
})


export const getAdminAllCourses = CatchAsyncError(
    async(req:Request , res:Response, next:NextFunction)=>{
        try {
            getAllCoursesService(res)
        } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
        }
    }
)

export const deleteCourse = CatchAsyncError(
    async(req:Request , res:Response, next:NextFunction)=>{
        try {
            const {id} = req.params

            const course = await CourseModel.findById(id)

            if(!course){
                return next(new ErrorHandler("course not found",404)) 
            }

            await course.deleteOne({id})

            await redis.del(id)

            res.status(200).json({
            success:true,
            message: "Course deleted Successfully",
        })

        } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
        }
    }
)


// generate video url
export const generateVideoUrl = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {videoId} = req.body;
        console.log(`[VdoCipher API] Request received for video ID: ${videoId}`);
        console.log(`[VdoCipher API] Using Secret: ${process.env.VDOCIPHER_API_SECRET ? 'Loaded' : '!!! MISSING / UNDEFINED !!!'}`);

        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
                },
            }
        );

        res.json(response.data);
    } catch (error:any) {
        console.error("=================================================");
        console.error("🚨 VdoCipher API Call Failed 🚨");
        
        if (error.response) {
            console.error("VdoCipher Response Status:", error.response.status); 
            console.error("VdoCipher Error Data:", error.response.data);
            console.error("Request URL:", error.config.url);
            
            if (error.response.status === 401) {
                console.warn("HINT: 401 Unauthorized likely means the VDOCIPHER_API_SECRET is wrong or expired.");
            } else if (error.response.status === 404) {
                console.warn("HINT: 404 Not Found likely means the video ID is incorrect or not yet processed by VdoCipher.");
            }
        } else if (error.request) {
            console.error("Network or No Response Received:", error.message);
        } else {
            console.error("General Axios Error:", error.message);
        }
        console.error("=================================================");
       
        return next(new ErrorHandler("Video OTP generation failed. Check server logs for details.", 400))
    }
})