import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-management')
        console.log(`MongoDB connected: ${conn.connection.host}`)
        return conn
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`)
        process.exit(1)
    }
}
