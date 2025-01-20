import express from "express";
import { registerEmployee, loginEmployee, getEmployee, getManagedEmployees } from "../controllers/employee.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/get/:requestedEmployee_id?", isLoggedIn, getEmployee);
router.post("/register", isLoggedIn, registerEmployee);
router.post("/login", loginEmployee);
router.get("/getManagedEmployees/:requestedEmployee_id?", isLoggedIn, getManagedEmployees);

// router.post("/update", isLoggedIn, updateEmployee);

export default router;
