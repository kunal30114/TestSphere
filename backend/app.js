import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();


//body-access
app.use(express.json({
  limit : '16kb'
}))
//decrpyt url params
app.use(express.urlencoded({extended: true , limit : "16kb" }));

app.use(cookieParser());
//cross-origin handling
app.use(cors({
  origin : process.env.ORIGIN,
  credentials: true
}));


//routes
import teacherRoutes from "./routes/teacher.route.js";
app.use("/teacher", teacherRoutes);
import studentRoutes from "./routes/student.route.js";
app.use("/student",studentRoutes);




export {app};

