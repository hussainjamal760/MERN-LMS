import { Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncErrors";
import CourseModel from "../models/course.model";


export const createCourse = CatchAsyncError(async(data:any, res:Response)=>{
    const course = await CourseModel.create(data)
    res.status(201).json({
        success:true,
        course,
    })
})

export const getAllCoursesService = async(res:Response)=>{
    const courses =await CourseModel.find().sort({createdAt:-1});
        res.status(201).json({
            status:true,
            courses,
        })
}
