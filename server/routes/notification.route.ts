import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { getNotification, updateNotification } from '../controllers/notification.controller';
const notificationRouter = express.Router();

notificationRouter.get("/get-notifications" , isAuthenticated ,authorizeRoles("admin") , getNotification)
notificationRouter.put("/update-notifications/:id" , isAuthenticated ,authorizeRoles("admin") , updateNotification)

export default notificationRouter