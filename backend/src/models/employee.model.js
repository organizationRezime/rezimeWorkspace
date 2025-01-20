import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    level: {
        type: Number,
        default: 1,
    },
    manager: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true
    },
    number: {
        type: Number,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        default: "Employee"
    },
    lastAttendance: {
        type: Date,
        default: null
    },
}, { timestamps: true });



employeeSchema.methods.isPasswordCorrect = function (givenPassword) {
    return givenPassword === this.password;
}

employeeSchema.methods.generateToken = function () {
    return jwt.sign(
        { 
        _id: this._id
        },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY}
);
}

employeeSchema.methods.isManager = async function(employeeId) {
    return this.manager === employeeId;
};

employeeSchema.methods.isAdmin = async function() {
    return this.level > 3;
};

const Employee = mongoose.model('Employee', employeeSchema);
export {Employee}