import ErrorHandler from "../utils/error.js";
import UserModel from "../model/user.model.js";
import mongoose from "mongoose";
import projectModel from "../model/project.model.js";

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
        console.log("error in backend get user", error.message)
        return next(new ErrorHandler(error.message, 500));
    }
}

export const createProject = async (req, res, next) => {
    try {

        const { name } = req.body;
        const userId = req.user;
        if (!mongoose.Types.ObjectId.isValid(userId) || !name) {
            return next(new ErrorHandler("User not Authenticated", 400));
        }

        const newProject = await projectModel.create({
            name,
            owner: userId,
            participants: [userId]
        })



        if (!newProject) {
            return next(new ErrorHandler("Not created", 400));
        }

        res.status(201).json(newProject)

    } catch (error) {
        console.log("error in backend in creting project ", error)
        return next(new ErrorHandler(error.message, 500));
    }
}

export const getProjectOfUser = async (req, res, next) => {
    try {
        const userId = req.user;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new ErrorHandler("User not Authenticated", 400));
        }

        const userProjects = await projectModel.find({
            participants: userId
        }).populate("owner").populate("participants")

        if (!userProjects) {
            return next(new ErrorHandler("No projects found", 404));
        }

        res.status(200).json(userProjects)
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const addCollabrator = async (req, res, next) => {
    try {
        const { collabratorEmail, projectId } = req.body
        if (!collabratorEmail || !projectId) {
            return next(new ErrorHandler("Collabrator email and project ID are required", 400))
        }

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new ErrorHandler("Invalid project ID", 400))
        }

        const existingUser = await UserModel.findOne({ email: collabratorEmail })
        if (!existingUser) {
            return next(new ErrorHandler("This user is not Found", 400))
        }

        const updatedProject = await projectModel.findOneAndUpdate(
            { _id: projectId },
            { $push: { participants: existingUser._id } },
            { new: true }
        ).populate("owner").populate("participants")

        if (!updatedProject) {
            return next(new ErrorHandler("Project not found", 404))
        }

        res.status(200).json(updatedProject)

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}




