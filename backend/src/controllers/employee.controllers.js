import {Employee} from "../models/employee.model.js";
import mongoose from "mongoose";

const registerEmployee = async (req, res) => {
    try {
        const {
            fullname,
            employeeId,
            email,
            password,
            position,
            level,
            address,
            number,
            manager,
        } = req.body;


        const loggedInEmployee_id = req.employee._id;

        const loggedInEmployee = await Employee.findById(loggedInEmployee_id);

        if (!loggedInEmployee || loggedInEmployee.level < 2) {
            return res.status(403).json({ message: "Unauthorized." });
        }

        const existingEmployee = await Employee.findOne({
            $or: [{ employeeId }, { email }],
        });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists." });
        }

        const managerDetails = await Employee.findOne({employeeId: manager});
        if(!managerDetails) return res.status(401).json({message: "invalid manager id"});

        let employee = await Employee.create({
            fullname,
            employeeId,
            email,
            password,
            position,
            manager,
            level,
            address,
            number,
        });

        if (!employee) {
            return res.status(500).json({ message: "Failed to create employee." });
        }

        employee = await Employee.findById(employee._id).select("-password");

        res.status(201).json({
            message: "Employee registered successfully.",
            employee,
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            message: error.message || "Server error. Please try again.",
        });
    }
};



const loginEmployee = async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        const employee = await Employee.findOne({ employeeId });
        if (!employee) return res.status(404).json({ message: "Employee not found." });

        if (!employee.isPasswordCorrect(password)) return res.status(400).json({ message: "Invalid employeeId or password." });

        const token = employee.generateToken();

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        
        res.status(200).cookie("token", token, options).json({ success: true, token }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const getEmployee = async (req, res) => {
    try {
        const requestedEmployee_id = req.params?.requestedEmployee_id || req.employee._id;
        const loggedInEmployee_id = req.employee._id;

        if (
            !mongoose.Types.ObjectId.isValid(requestedEmployee_id) ||
            !mongoose.Types.ObjectId.isValid(loggedInEmployee_id)
        ) {
            return res.status(400).json({ message: "Invalid Employee ID format." });
        }

        const findEmployee = (id) => Employee.findById(id).select("-password");
        const [requestedEmployee, loggedInEmployee] = await Promise.all([
            findEmployee(requestedEmployee_id),
            findEmployee(loggedInEmployee_id)
        ]);

        if (!requestedEmployee || !loggedInEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        const isSameEmployee = requestedEmployee._id.toString() === loggedInEmployee._id.toString();
        const isManager = await requestedEmployee.isManager(loggedInEmployee.employeeId);
        const isAdmin = await loggedInEmployee.isAdmin();
        const hasAccess = isSameEmployee || isManager || isAdmin;

        if (!hasAccess) {
            return res.status(403).json({ message: "You do not have permission to view this employee's details." });
        }

        res.status(200).json(requestedEmployee);
    } catch (error) {
        console.error("Error in getEmployee:", error);
        res.status(500).json({ message: "Server error. Please try again.", error: error.message });
    }
};

const getManagedEmployees = async (req, res) => {
    try {
        const requestedEmployee_id = req.params?.requestedEmployee_id || req.employee._id;
        const loggedInEmployee_id = req.employee._id;
        
        if (!mongoose.Types.ObjectId.isValid(requestedEmployee_id) || !mongoose.Types.ObjectId.isValid(loggedInEmployee_id)) {
            return res.status(400).json({ message: "Invalid Employee ID format." });
        }

        const loggedInEmployee = await Employee.findById(loggedInEmployee_id);
        const requestedEmployee = await Employee.findById(requestedEmployee_id);

        if (!loggedInEmployee || !requestedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        const hasAccess = loggedInEmployee._id.equals(requestedEmployee._id) || await loggedInEmployee.isAdmin();
        if (!hasAccess) {
            return res.status(403).json({ message: "You do not have permission to view managed employees." });
        }

        const managedEmployees = await Employee.find({ manager: requestedEmployee.employeeId }).select("employeeId fullname");

        res.status(200).json(managedEmployees);
        
    }catch (error) {
        console.error("Error fetching employee:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};


export { registerEmployee, loginEmployee, getEmployee, getManagedEmployees };