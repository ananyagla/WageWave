# Employee Management System - Project

A modern, professional Employee Management System with MongoDB backend and responsive frontend.

## Project Structure

```
Project/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Employees.js
│   │   ├── Payroll.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── employee.js
│   │   ├── payroll.js
│   │   ├── attendance.js
│   │   └── stats.js
│   ├── index.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    └── assets/
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/employee-management
PORT=8000
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Start a local server:
```bash
npx http-server -p 5000
```

Or with Python:
```bash
python -m http.server 5000
```

3. Open browser to `http://localhost:5000`

## Features

- ✅ Employee Management (CRUD)
- ✅ Payroll Generation with automatic tax calculation (12%)
- ✅ Attendance Tracking
- ✅ Admin Dashboard with key metrics
- ✅ Search functionality
- ✅ Employee ratings and performance comments
- ✅ Responsive design
- ✅ Modern gradient UI

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/:id` - Get employee by ID

### Payroll
- `GET /api/payroll` - Get all payroll records
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/:id` - Update payroll
- `DELETE /api/payroll/:id` - Delete payroll

### Attendance
- `GET /api/attendance` - Get all attendance
- `POST /api/attendance` - Create attendance
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Statistics
- `GET /api/stats/dashboard` - Dashboard stats
- `GET /api/stats/top-performing` - Top employees
- `GET /api/stats/department-breakdown` - Department stats

## Default Ports

- Frontend: `http://localhost:5000`
- Backend: `http://localhost:8000`

## Requirements

- Node.js v14+
- MongoDB (local or cloud)
- Modern browser supporting ES6+

## Technology Stack

**Backend:**
- Express.js
- Mongoose
- Node.js

**Frontend:**
- Vanilla JavaScript (no frameworks)
- HTML5
- CSS3

## Features Overview

### Home Page
- View employees in card layout
- Search employees
- Add new employees
- View detailed employee info
- Delete employees

### Salary Page
- Generate payroll records
- Automatic tax calculation
- Add bonuses and deductions
- Mark payroll as paid
- View salary history

### Dashboard
- Total employee count
- Active employees
- Monthly payroll total
- Department count
- Top performing employees

## Notes

- Tax is calculated at 12% of base salary
- Email must be unique per employee
- All data stored in MongoDB
- No authentication included (add for production)
