import express from "express";
const app = express();
import cookieParser from 'cookie-parser';
import cors from "cors";

import employeeRouter from "./routes/employee.router.js";
import taskRouter from "./routes/tasks.router.js";
import attendanceRouter from "./routes/attendance.routes.js"

const allowedOrigins = process.env.CORS_ORIGINS.split(',');

app.use(cors({
  origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

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