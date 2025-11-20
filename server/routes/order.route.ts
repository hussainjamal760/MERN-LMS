import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { createOrder, getAllOrders } from '../controllers/order.controllers';
const orderRouter = express.Router();

orderRouter.post("/create-order" , isAuthenticated , createOrder)
orderRouter.get("/get-orders" , isAuthenticated , authorizeRoles("admin"),getAllOrders)

export default orderRouter