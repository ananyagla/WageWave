import mongoose, { Schema } from 'mongoose'

const PayrollSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employees',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    baseSalary: {
        type: Number,
        required: true
    },
    bonus: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    taxAmount: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'paid'],
        default: 'pending'
    },
    paidDate: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const Payroll = mongoose.model('Payroll', PayrollSchema)
