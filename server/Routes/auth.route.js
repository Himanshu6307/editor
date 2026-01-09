import express from "express"
import { body } from "express-validator";
import { Login, Logout, SignUp } from "../controllers/auth.controllers.js";

const AuthRouter = express.Router()

AuthRouter.post("/login",Login)

AuthRouter.post("/logout",Logout)

AuthRouter.post("/signup",[
    body("email")
      .notEmpty().withMessage("Email required hai")
      .isEmail().withMessage("Valid email daalo"),
  ],SignUp)


export default AuthRouter