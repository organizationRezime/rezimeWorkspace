import mongoose from "mongoose";
import { Employee } from "./employee.model.js";
const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    category: {
        type: String,
    },
    assignedByName:{
        type: String,
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "low",
    },
    dueDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

taskSchema.methods.hasAccess = async function (employee_id) {
    return this.assignedTo === employee_id || this.assignedBy === employee_id;
}

taskSchema.pre("save", async function (next) {
    if (!this.isNew) return next();

    const assignedTo = await Employee.findById(this.assignedTo);
    const assignedBy = await Employee.findById(this.assignedBy);

    if (!assignedTo || !assignedBy) {
        return next(new Error("Invalid employee ID."));
    }

    next();
});

const Task = mongoose.model('Task', taskSchema);
export { Task };
