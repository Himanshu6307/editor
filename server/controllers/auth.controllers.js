import bcrypt from "bcryptjs"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";
import UserModel from "../model/user.model.js";



export const SignUp = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        if (!email || !password) {
            return next(new ErrorHandler("Empty field", 404))
        }

        const hashedPassword = await UserModel.hashedPassword(password)

        const user = await UserModel.create({
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // localhost → false
            sameSite: "lax",    // localhost
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json(user)


    } catch (error) {
        console.log("error in signup backend", error.message)
        return next(new ErrorHandler(error.message, 404))

    }
}

export const Login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Empty field", 404))
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return next(new ErrorHandler("User not found", 404))
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid Credentials", 404))
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // localhost → false
            sameSite: "lax",    // localhost
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json(user)


    } catch (error) {
        console.log("error in login backend", error.message)
        return next(new ErrorHandler(error.message, 404))

    }
}

export const Logout = async (req, res, next) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }).status(200).json({ success: true, message: "Logout Successfully" });

    } catch (error) {
        console.log("error in logout user backend ", error.message)
        return next(new ErrorHandler(error.message, 500))
    }
}