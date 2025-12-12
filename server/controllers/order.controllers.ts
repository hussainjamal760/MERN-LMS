import { NextFunction, Request , Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import ejs from "ejs"
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import { io } from "../socketServer"; 

export const createOrder = CatchAsyncError(async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const {courseId , payment_info} = req.body as IOrder

        if(payment_info){
            if("id" in payment_info){
                const paymentIntentsId = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    paymentIntentsId
                )
                if(paymentIntent.status !== "succeeded"){
                    return next (new ErrorHandler("Payment not authorized!" , 400))
                }
            }
        }

        const user = await userModel.findById(req.user?._id)

        const courseExistsInUser = user?.courses.some((course:any)=>course._id.toString() === courseId.toString())
        
        if(courseExistsInUser){
        return next(new ErrorHandler("You have already purchased this course",404))
        }

        const course:ICourse | null = await CourseModel.findById(courseId)

        if(!course){
            return next(new ErrorHandler("Course not found",500))
        }

        const data:any={
            courseId:course._id,
            userId:user?._id,
            payment_info
        }

        const mailData = {
            order:{
                _id:(course._id as string).toString().slice(0,6),
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-US' , {year:'numeric',month:'long',day:'numeric'})

            },
            url: process.env.ORIGIN
        }

        const html = await ejs.renderFile(path.join(__dirname , '../mails/order-confirmation.ejs'),mailData)

        try {
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Order Confirmation",
                    template:"order-confirmation.ejs",
                    data:mailData
                })
            }

            if (user && course?._id) {
                 user.courses.push({ courseId: course._id.toString() });
                }
                
                await redis.set(req.user?._id , JSON.stringify(user))

            await user?.save()

            await NotificationModel.create({
                user:user?._id,
                title:"New Order",
                message:`You have a new order from ${course?.name}`,
            })

            await NotificationModel.create({
                user: user?._id,
                title: "New Order",
                message: `You have a new order from ${course?.name}`,
            });

            if (io) {
                io.emit("newNotification", {
                    title: "New Order",
                    message: `You have a new order from ${course?.name}`,
                    createdAt: new Date().toISOString()
                });
            }
            

        } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
        }

        course.purchased = course.purchased + 1;

        newOrder(data , res , next)

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})


export const getAllOrders = CatchAsyncError(
    async(req:Request , res:Response, next:NextFunction)=>{
        try {
            getAllOrdersService(res)
        } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
        }
    }
)

export const sendStripePublishableKey = CatchAsyncError(async(req:Request , res:Response)=>{
    res.status(200).json({
        publishableKey : process.env.STRIPE_PUBLISHABLE_KEY
    })
})

export const newPayment = CatchAsyncError(async (req:Request , res:Response, next:NextFunction)=>{
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency: "USD",
            metadata : {
                company : "Sheep Academy",
            },
            automatic_payment_methods:{
                enabled:true,
            }
        })

        res.status(201).json({
            success:true,
            client_secret:myPayment.client_secret
        })
    } catch (error:any) {
        return next (new ErrorHandler(error.message , 500))
    }
})