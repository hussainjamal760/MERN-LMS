import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { uploadCourse ,editCourse, getSingleCourse , getAllCourses, getCourseByUser} from '../controllers/course.controllers';
const courseRouter = express.Router();

courseRouter.post('/create-course',isAuthenticated , authorizeRoles("admin"),uploadCourse);
courseRouter.put('/edit-course/:id',isAuthenticated , authorizeRoles("admin"),editCourse);
courseRouter.get('/get-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourses);
courseRouter.get('/get-course-content/:id',isAuthenticated,getCourseByUser);

export default courseRouter