import mongoose, { Schema } from 'mongoose'

const EmployeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    baseSalary: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on-leave'],
        default: 'active'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    ratingComment: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export const Employees = mongoose.model('Employees', EmployeeSchema)
