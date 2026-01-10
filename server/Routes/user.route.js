import express from "express";
import { getUser } from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", AuthMiddleware, getUser);

export default userRouter;
