import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { uploadCourse } from '../controllers/course.controllers';
const courseRouter = express.Router();

courseRouter.post('/create-course',isAuthenticated , authorizeRoles("admin"),uploadCourse);

export default courseRouter