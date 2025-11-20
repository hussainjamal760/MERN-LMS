import express from 'express'
import {isAuthenticated,authorizeRoles} from '../middleware/auth'
import { createLayout , editLayout , getLayout} from '../controllers/layout.controllers';
const layoutRouter = express.Router();

layoutRouter.post("/create-layout" , isAuthenticated ,authorizeRoles("admin") , createLayout)
layoutRouter.put("/edit-layout" , isAuthenticated ,authorizeRoles("admin") , editLayout)
layoutRouter.get("/get-layout" , getLayout)

export default layoutRouter