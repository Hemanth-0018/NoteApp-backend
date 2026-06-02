import express,{Request,Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db"
import noteRoutes from "./routes/noteRoutes"
import authRoutes from "./routes/authRoutes"
dotenv.config()
const app=express()

connectDB()

app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://note-app-frontend-je2uoxqy8-hemanth-eswar-s-projects.vercel.app"
    ],credentials:true
}))
app.use(express.json())

app.get("/",async(req:Request,res:Response)=>{
    res.send("API Running")
})

app.use("/api/auth",authRoutes)
app.use("/api/notes",noteRoutes)
const PORT=process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
