import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from '../controllers/order.controllers';
const orderRouter = express.Router();

orderRouter.post("/create-order" , isAuthenticated , createOrder)
orderRouter.get("/get-orders" , isAuthenticated , authorizeRoles("admin"),getAllOrders)
orderRouter.get("/payment/stripepublishablekey" ,sendStripePublishableKey  )
orderRouter.get("/payment" , isAuthenticated , newPayment)

export default orderRouter