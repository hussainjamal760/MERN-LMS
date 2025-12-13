import { NextFunction, Response,Request } from "express"
import { CatchAsyncError } from "../middleware/CatchAsyncErrors"
import ErrorHandler from "../utils/ErrorHandler"
import NotificationModel from "../models/notification.model"
import cron from 'node-cron'

export const getNotification = CatchAsyncError(async (req:Request, res: Response,next:NextFunction)=>{
    try {
        const notifications = await NotificationModel.find().sort({createdAt:-1})
        
        res.status(201).json({
            success:true,
            notifications
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

export const updateNotification = CatchAsyncError(async(req:Request, res: Response,next:NextFunction)=>{
    try {
        const notification = await NotificationModel.findById(req.params.id);

        if(!notification){
            return next(new ErrorHandler("Notification not found",404));
        }

        // ✅ Simple aur correct assignment
        notification.status = "read";

        await notification.save();

        const notifications = await NotificationModel.find().sort({createdAt:-1});

        res.status(200).json({ // 201 created ke liye hota hai, update ke liye 200 behtar hai
            success:true,
            notifications
        });

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
cron.schedule("0 0 0 * * *",async()=>{
    const thirtyDaysAgo= new Date(Date.now()-30*24*60*60)
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:thirtyDaysAgo}})
    console.log("Delete read notifications");
    
})