import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";

const markAttendance = async (req, res) => {

    const employee_id = req.employee._id;
    try {        
        const employee = await Employee.findById(employee_id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Check if lastAttendance exists
        if (employee.lastAttendance) {

            const lastAttendanceDate = new Date(employee.lastAttendance);

            // Check if the last attendance was today
            if (lastAttendanceDate >= today) {
                return res.status(404).json({ message: "Already attended today." });
            }
        }

        const newAttendance = new Attendance({ employee_id });
        await newAttendance.save();

        employee.lastAttendance = now;
        await employee.save();

        res.status(201).json({ message: "Attendance marked successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
}

const getAttendance = async (req, res) => {
    const { requestedEmployee_id } = req.params;
    const loggedInEmployee_id = req.employee._id;

    if (!requestedEmployee_id) {
        return res.status(400).json({ message: "Employee id is not given." });
    }

    try {
        const requestedEmployee = await Employee.findOne({$or: [{employeeId: requestedEmployee_id}, {_id: requestedEmployee_id}, {email: requestedEmployee_id}]}).select("employeeId attendanceRecords manager");      
        const loggedInEmployee = await Employee.findById(loggedInEmployee_id).select("level attendanceRecords employeeId");

        if (!requestedEmployee || !loggedInEmployee) {
            return res.status(403).json({ message: "Unauthorized." });
        }

        if (requestedEmployee_id !== loggedInEmployee_id && 
            !(await requestedEmployee.isManager(loggedInEmployee.employeeId)) && 
            !(await loggedInEmployee.isAdmin())) {
            return res.status(403).json({ message: "Unauthorized." });
        }
        
        const attendanceRecords = await Attendance.find({employee_id: requestedEmployee._id});

        return res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};

export { markAttendance, getAttendance };