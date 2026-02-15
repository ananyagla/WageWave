import express from 'express'
import { Employees } from '../models/Employees.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const employees = await Employees.find().sort({ createdAt: -1 })
        res.json(employees)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query
        if (!q) return res.status(400).json({ error: 'Search query required' })
        
        const employees = await Employees.find({
            $or: [
                { firstname: { $regex: q, $options: 'i' } },
                { lastname: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { position: { $regex: q, $options: 'i' } }
            ]
        })
        res.json(employees)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employees.findById(req.params.id)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, position, department, dateOfJoining, baseSalary } = req.body
        
        if (!firstname || !lastname || !email || !phone || !position || !department || !baseSalary) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const existingEmployee = await Employees.findOne({ email })
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        const employee = new Employees({
            firstname,
            lastname,
            email,
            phone,
            position,
            department,
            dateOfJoining: new Date(dateOfJoining),
            baseSalary: Number(baseSalary)
        })

        await employee.save()
        res.status(201).json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const employee = await Employees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employees.findByIdAndDelete(req.params.id)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json({ message: 'Employee deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.patch('/:id/rating', async (req, res) => {
    try {
        const { rating, ratingComment } = req.body
        const employee = await Employees.findByIdAndUpdate(
            req.params.id,
            { rating, ratingComment },
            { new: true }
        )
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
