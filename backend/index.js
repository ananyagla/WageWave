import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/database.js'
import employeeRoutes from './routes/employee.js'
import payrollRoutes from './routes/payroll.js'
import attendanceRoutes from './routes/attendance.js'
import statsRoutes from './routes/stats.js'

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 8000

app.use('/api/employees', employeeRoutes)
app.use('/api/payroll', payrollRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/stats', statsRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
