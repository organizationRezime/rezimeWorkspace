import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export { Attendance };