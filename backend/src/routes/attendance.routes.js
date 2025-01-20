import express from "express";
import { getAttendance, markAttendance } from "../controllers/attendance.controllers.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/get/:requestedEmployee_id", isLoggedIn, getAttendance);

router.post("/mark", isLoggedIn, markAttendance);

export default router;