import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./configurations/db.js"
import AuthRouter from "./Routes/auth.route.js"
import userRouter from "./Routes/user.route.js";
const app = express()

const port =process.env.PORT || 4000
connectDB()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/user",userRouter)


app.listen(port,()=>{
        console.log(`app running on port ${port}`)
})






