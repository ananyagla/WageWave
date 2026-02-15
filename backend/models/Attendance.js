import mongoose, { Schema } from 'mongoose'

const AttendanceSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employees',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hoursWorked: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'leave'],
        default: 'present'
    }
}, { timestamps: true })

export const Attendance = mongoose.model('Attendance', AttendanceSchema)
