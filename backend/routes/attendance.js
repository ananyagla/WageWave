import express from 'express'
import { Attendance } from '../models/Attendance.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('employeeId').sort({ date: -1 })
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 })
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { employeeId, date, hoursWorked, status } = req.body

        const attendance = new Attendance({
            employeeId,
            date: new Date(date),
            hoursWorked,
            status
        })

        await attendance.save()
        res.status(201).json(attendance)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!attendance) return res.status(404).json({ error: 'Attendance not found' })
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id)
        if (!attendance) return res.status(404).json({ error: 'Attendance not found' })
        res.json({ message: 'Attendance deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
