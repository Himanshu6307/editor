import express from "express";
import { addCollabrator, createProject, getProjectOfUser, getUser } from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", AuthMiddleware, getUser);
userRouter.post("/createproject", AuthMiddleware, createProject);
userRouter.get("/userproject", AuthMiddleware,getProjectOfUser);
userRouter.post("/addparticipants", AuthMiddleware,addCollabrator);

export default userRouter;
