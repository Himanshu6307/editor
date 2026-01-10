import ErrorHandler from "../utils/error.js";
import UserModel from "../model/user.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res, next) => {
    try {
        const userId = req.user;
        console.log(userId)

        if (!userId) {
            return next(new ErrorHandler("User not authenticated", 401));
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new ErrorHandler("Invalid user ID", 400));
        }

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json(user);

    } catch (error) {
        console.log("error in backend get user",error.message)
        return next(new ErrorHandler(error.message, 500));
    }
}