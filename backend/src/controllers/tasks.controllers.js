import { Task } from "../models/task.model.js";
import { Employee } from "../models/employee.model.js";
import { isValidObjectId } from "mongoose";

const assignTask = async (req, res) => {
    try {
        const {taskId , assignedBy, assignedTo, title, description, dueDate, priority, status, category } = req.body;
        
        const employee_id = req.employee._id;
        const employee = await Employee.findById(employee_id);

        const canAssign = employee_id.toString() === assignedBy.toString() || await employee.isAdmin();
        
        if(!canAssign) return res.status(403).json({message: "You dont have permission to assign this task"});

        const assignedByEmployee = await Employee.findById(assignedBy);
        const assignedToEmployee = await Employee.findById(assignedTo);
        if (!assignedByEmployee || !assignedToEmployee) {
            return res.status(404).json({ message: "AssignedBy or AssignedTo employee not found." });
        }

        const newTask = {
            taskId , assignedBy, assignedTo, title, description, dueDate, priority, status, category, assignedByName: assignedByEmployee.fullname
        }

        let task = await Task.findOne({taskId});
        if(task) return res.status(401).json({
            message: "Task is already created"
        });

         task = await Task.create(newTask);

        res.status(201).json({ message: "Task assigned successfully.", task });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const getTask = async (req, res) => {
    const { task_id } = req.params;
    try {
        const task = await Task.findOne({$or: [{_id:task_id}, {taskId: task_id}]});

        if (!task) return res.status(404).json({ message: "Task not found." });

        if(!task.hasAccess(req.employee._id)) return res.status(403).json({ message: "Unauthorized." });

        res.status(200).json({ task });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const tasksAssignedByEmployee = async (req, res) => {
    try {
        const requestedEmployee_id = req.params.requestedEmployee_id;
        const loggedInEmployee_id = req.employee._id;

        // Validate IDs (assuming a validation function `isValidObjectId`)
        if (!isValidObjectId(requestedEmployee_id) || !isValidObjectId(loggedInEmployee_id)) {
            return res.status(400).json({ message: "Invalid employee ID." });
        }

        // Check access permissions
        const loggedInEmployee = await Employee.findById(loggedInEmployee_id);
        if (!loggedInEmployee) {
            return res.status(404).json({ message: "Logged-in employee not found." });
        }

        const isAdmin = await loggedInEmployee.isAdmin();
        const isSelf = requestedEmployee_id === loggedInEmployee_id.toString();

        if (!isAdmin && !isSelf) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        // Fetch tasks if access is granted
        const tasks = await Task.find({ assignedBy: requestedEmployee_id });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks assigned by employee:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};


const tasksAssignedToEmployee = async (req, res) => {
    try {
        const requestedEmployee_id = req.params.requestedEmployee_id;
        const loggedInEmployee_id = req.employee._id;

        // Validate IDs (assuming a validation function `isValidObjectId`)
        if (!isValidObjectId(requestedEmployee_id) || !isValidObjectId(loggedInEmployee_id)) {
            return res.status(400).json({ message: "Invalid employee ID." });
        }

        // Fetch employees
        const requestedEmployee = await Employee.findById(requestedEmployee_id);
        const loggedInEmployee = await Employee.findById(loggedInEmployee_id);

        // Check if employees exist
        if (!requestedEmployee) {
            return res.status(404).json({ message: "Requested employee not found." });
        }
        if (!loggedInEmployee) {
            return res.status(404).json({ message: "Logged-in employee not found." });
        }

        // Check access permissions
        const hasAccess =
            requestedEmployee_id === loggedInEmployee_id ||
            (await loggedInEmployee.isAdmin()) ||
            (await requestedEmployee.isManager(loggedInEmployee_id));

        if (!hasAccess) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        // Fetch tasks
        const tasks = await Task.find({ assignedTo: requestedEmployee_id });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const archivedTasks = async (req, res) => {
    const { empId } = req.body;
    try {
        const tasks = await Task.find({ archivedBy: empId });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const updateTask = async (req, res) => {
    const { task_id, status } = req.body;
    try {
        const task = await Task.findById(task_id);
        if (!task) return res.status(404).json({ message: "Task not found." });

        if (task.assignedBy.toString() === req.employee._id.toString()) {
            task.status = status;
            await task.save();
            res.status(200).json({ message: "Task updated successfully.", task });
        } else {
            res.status(403).json({ message: "Unauthorized." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const deleteTask = async (req, res) => {
    const { task_id } = req.body;
    const employee_id = req.employee._id;
    try {
        const employee = await Employee.findById(employee_id);
        if(!employee) return res.status(404).json({ message: "Employee not found." });

        if (!employee.isAdmin()) {
            return res.status(403).json({ message: "Employee not a Admin." });
        }

        const task = await Task.findById(task_id);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const archiveTask = async (req, res) => {
    const { task_id } = req.body;
    try {
        const task = await Task.findById(task_id);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (task.assignedTo === req.employee._id) {
            task.isArchived = !task.isArchived;

            await task.save();
            res.status(200).json({ message: "Task archived successfully." });
        } else {
            res.status(403).json({ message: "Unauthorized." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const markAsReadTask = async (req, res) => {
    const { task_id } = req.body;
    
    try {
        const task = await Task.findById(task_id);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (task.assignedTo.toString() === req.employee._id.toString()) {
            task.isRead = true;
            await task.save();
            res.status(200).json({ message: "Task marked as read.", task });
        } else {
            res.status(403).json({ message: "Unauthorized." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

export {
    tasksAssignedToEmployee,
    tasksAssignedByEmployee,
    archivedTasks,
    getTask,
    assignTask,
    updateTask,
    deleteTask,
    archiveTask,
    markAsReadTask,
};
