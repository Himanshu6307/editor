import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./configurations/db.js"
import AuthRouter from "./Routes/auth.route.js"
const app = express()

const port =process.env.PORT || 4000
connectDB()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"*"
}))

app.use("/api/v1/auth",AuthRouter)


app.listen(port,()=>{
        console.log(`app running on port ${port}`)
})






