import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { getNotification, updateNotification } from '../controllers/notification.controller';
const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications" , isAuthenticated ,authorizeRoles("admin") , getNotification)
notificationRouter.put("/update-notifications" , isAuthenticated ,authorizeRoles("admin") , updateNotification)

export default notificationRouter