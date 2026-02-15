import express from 'express'
import { Employees } from '../models/Employees.js'
import { Payroll } from '../models/Payroll.js'
import { Attendance } from '../models/Attendance.js'

const router = express.Router()

router.get('/dashboard', async (req, res) => {
    try {
        const totalEmployees = await Employees.countDocuments()
        const activeEmployees = await Employees.countDocuments({ status: 'active' })
        
        const currentMonth = new Date().toISOString().slice(0, 7)
        const monthlyPayrolls = await Payroll.find({ month: currentMonth })
        const totalPayroll = monthlyPayrolls.reduce((sum, p) => sum + p.netSalary, 0)
        const paidPayrolls = monthlyPayrolls.filter(p => p.status === 'paid').length
        
        const totalDepartments = await Employees.distinct('department')
        
        res.json({
            totalEmployees,
            activeEmployees,
            totalPayroll,
            paidPayrolls,
            totalDepartments: totalDepartments.length
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/department-breakdown', async (req, res) => {
    try {
        const breakdown = await Employees.aggregate([
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 },
                    avgSalary: { $avg: '$baseSalary' }
                }
            }
        ])
        res.json(breakdown)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/top-performing', async (req, res) => {
    try {
        const employees = await Employees.find({ rating: { $gte: 4 } }).sort({ rating: -1 }).limit(5)
        res.json(employees)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
