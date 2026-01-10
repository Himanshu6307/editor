import ErrorHandler from "../utils/error.js"
import jwt from "jsonwebtoken"

const AuthMiddleware = async (req, res, next) => {

    try {
        const token =
            req.cookies?.token ||
                (req.headers?.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.replace("Bearer ", "")
                : null);

        if (!token) {
            return next(new ErrorHandler("Unauthorised", 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.userId
        next()
    }
    catch (error) {
        console.log("error in auth middleware ", error.message)
        next(new ErrorHandler(error.message, 401))
    }
}

export default AuthMiddleware