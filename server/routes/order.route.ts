import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { createOrder } from '../controllers/order.controllers';
const orderRouter = express.Router();

orderRouter.post("/create-order" , isAuthenticated , createOrder)

export default orderRouter