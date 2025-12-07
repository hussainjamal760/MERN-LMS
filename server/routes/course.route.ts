import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { uploadCourse ,editCourse, getSingleCourse , getAdminAllCourses, getCourseByUser, addQuestion, addAnswer, addReview, addReplyToReview, getAllCourse, deleteCourse, generateVideoUrl} from '../controllers/course.controllers';
const courseRouter = express.Router();

courseRouter.post('/create-course',isAuthenticated , authorizeRoles("admin"),uploadCourse);
courseRouter.put('/edit-course/:id',isAuthenticated , authorizeRoles("admin"),editCourse);
courseRouter.get('/get-course/:id',getSingleCourse);
courseRouter.get('/get-course',getAllCourse);
courseRouter.get('/get-course-content/:id',isAuthenticated,getCourseByUser);
courseRouter.put('/add-question',isAuthenticated,addQuestion);
courseRouter.put('/add-answer',isAuthenticated,addAnswer);
courseRouter.put('/add-review/:id',isAuthenticated,addReview);
courseRouter.put('/add-reply',isAuthenticated,authorizeRoles("admin"),addReplyToReview);
courseRouter.get('/get-admin-courses',isAuthenticated,authorizeRoles("admin"),getAdminAllCourses);
courseRouter.post('/getVdoCipherOTP',generateVideoUrl);
courseRouter.delete('/delete-course/:id',isAuthenticated,authorizeRoles("admin"),deleteCourse);

export default courseRouter