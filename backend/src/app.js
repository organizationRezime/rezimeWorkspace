import express from "express";
const app = express();
import cookieParser from 'cookie-parser';
import cors from "cors";

import employeeRouter from "./routes/employee.router.js";
import taskRouter from "./routes/tasks.router.js";
import attendanceRouter from "./routes/attendance.routes.js"


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(cookieParser());

app.get("/api/v1", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/tasks", taskRouter);


export {app};