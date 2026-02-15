import express from 'express'
import { Payroll } from '../models/Payroll.js'
import { Employees } from '../models/Employees.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const payrolls = await Payroll.find().populate('employeeId').sort({ createdAt: -1 })
        res.json(payrolls)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id).populate('employeeId')
        if (!payroll) return res.status(404).json({ error: 'Payroll not found' })
        res.json(payroll)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const payrolls = await Payroll.find({ employeeId: req.params.employeeId }).sort({ createdAt: -1 })
        res.json(payrolls)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { employeeId, month, bonus, deductions } = req.body

        const employee = await Employees.findById(employeeId)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })

        const baseSalary = employee.baseSalary
        const taxAmount = Math.round(baseSalary * 0.12)
        const netSalary = baseSalary + bonus - deductions - taxAmount

        const payroll = new Payroll({
            employeeId,
            month,
            baseSalary,
            bonus,
            deductions,
            taxAmount,
            netSalary
        })

        await payroll.save()
        res.status(201).json(payroll)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { bonus, deductions, status, paidDate } = req.body
        const payroll = await Payroll.findById(req.params.id)
        
        if (!payroll) return res.status(404).json({ error: 'Payroll not found' })

        if (bonus !== undefined) payroll.bonus = bonus
        if (deductions !== undefined) payroll.deductions = deductions
        if (status) payroll.status = status
        if (paidDate) payroll.paidDate = new Date(paidDate)

        payroll.netSalary = payroll.baseSalary + payroll.bonus - payroll.deductions - payroll.taxAmount

        await payroll.save()
        res.json(payroll)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndDelete(req.params.id)
        if (!payroll) return res.status(404).json({ error: 'Payroll not found' })
        res.json({ message: 'Payroll deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
