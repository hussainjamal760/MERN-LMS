import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { getUsersAnalytics } from '../controllers/analystics.controllers';
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics" , isAuthenticated ,authorizeRoles("admin") , getUsersAnalytics)

export default analyticsRouter