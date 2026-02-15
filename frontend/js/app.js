const API_URL = 'http://localhost:8000/api'
let currentEmployeeId = null
let allEmployees = []

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
    const pageId = page + '-page'
    document.getElementById(pageId).classList.add('active')
    
    if (page === 'home') loadEmployees()
    else if (page === 'salary') loadPayrolls()
    else if (page === 'dashboard') loadDashboard()
}

async function loadEmployees() {
    try {
        const res = await fetch(`${API_URL}/employees`)
        allEmployees = await res.json()
        renderEmployees(allEmployees)
        populateEmployeeSelect()
    } catch (error) {
        console.error('Error loading employees:', error)
    }
}

function renderEmployees(employees) {
    const container = document.getElementById('employeesContainer')
    
    if (employees.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">👥</div><div>No employees found</div></div>'
        return
    }
    
    container.innerHTML = employees.map(emp => `
        <div class="employee-card">
            <div class="employee-avatar">${emp.firstname[0]}${emp.lastname[0]}</div>
            <div class="employee-name">${emp.firstname} ${emp.lastname}</div>
            <div class="employee-position">${emp.position}</div>
            <div class="employee-info">📍 ${emp.department}</div>
            <div class="employee-info">💼 ₹${emp.baseSalary.toLocaleString()}</div>
            <div class="employee-info">⭐ Rating: ${emp.rating}/5</div>
            <div><span class="badge ${emp.status === 'active' ? 'badge-active' : 'badge-inactive'}">${emp.status}</span></div>
            <div class="employee-actions">
                <button class="btn btn-sm btn-secondary" onclick="viewEmployee('${emp._id}')">View</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp._id}')">Delete</button>
            </div>
        </div>
    `).join('')
}

function searchEmployees() {
    const query = document.getElementById('searchInput').value.toLowerCase()
    const filtered = allEmployees.filter(emp =>
        `${emp.firstname} ${emp.lastname}`.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
    )
    renderEmployees(filtered)
}

async function viewEmployee(id) {
    try {
        const res = await fetch(`${API_URL}/employees/${id}`)
        const emp = await res.json()
        currentEmployeeId = id
        
        document.getElementById('detailName').textContent = `${emp.firstname} ${emp.lastname}`
        document.getElementById('detailContent').innerHTML = `
            <div style="margin-top: 1.5rem;">
                <div class="form-group">
                    <label>Email</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px;">${emp.email}</div>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px;">${emp.phone}</div>
                </div>
                <div class="form-group">
                    <label>Position / Department</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px;">${emp.position} / ${emp.department}</div>
                </div>
                <div class="form-group">
                    <label>Date of Joining</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px;">${new Date(emp.dateOfJoining).toLocaleDateString()}</div>
                </div>
                <div class="form-group">
                    <label>Base Salary</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px;">₹${emp.baseSalary.toLocaleString()}</div>
                </div>
                <div class="form-group">
                    <label>Rating</label>
                    <div class="rating-stars" style="pointer-events: none;">
                        ${[1, 2, 3, 4, 5].map(i => `<span class="star ${i <= emp.rating ? 'active' : ''}">★</span>`).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label>Performance Comment</label>
                    <div style="padding: 0.75rem; background: #f8f9fb; border-radius: 8px; min-height: 60px;">${emp.ratingComment || 'No comments'}</div>
                </div>
            </div>
        `
        document.getElementById('employeeDetailModal').classList.add('show')
    } catch (error) {
        console.error('Error loading employee:', error)
    }
}

function closeEmployeeDetail() {
    document.getElementById('employeeDetailModal').classList.remove('show')
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return
    try {
        await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' })
        loadEmployees()
    } catch (error) {
        console.error('Error deleting employee:', error)
    }
}

function openAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.add('show')
}

function closeAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.remove('show')
    document.querySelector('#addEmployeeModal form').reset()
}

async function saveEmployee(event) {
    event.preventDefault()
    try {
        const data = {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            position: document.getElementById('position').value,
            department: document.getElementById('department').value,
            dateOfJoining: document.getElementById('dateOfJoining').value,
            baseSalary: Number(document.getElementById('baseSalary').value)
        }
        
        await fetch(`${API_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        
        closeAddEmployeeModal()
        loadEmployees()
    } catch (error) {
        console.error('Error saving employee:', error)
        alert('Error saving employee')
    }
}

async function loadPayrolls() {
    try {
        const res = await fetch(`${API_URL}/payroll`)
        const payrolls = await res.json()
        
        const tbody = document.getElementById('payrollBody')
        tbody.innerHTML = payrolls.map(p => `
            <tr>
                <td>${p.employeeId.firstname} ${p.employeeId.lastname}</td>
                <td>${p.month}</td>
                <td>₹${p.baseSalary.toLocaleString()}</td>
                <td>₹${p.bonus.toLocaleString()}</td>
                <td>₹${p.deductions.toLocaleString()}</td>
                <td>₹${p.taxAmount.toLocaleString()}</td>
                <td style="font-weight: 700; color: #27ae60;">₹${p.netSalary.toLocaleString()}</td>
                <td><span class="badge ${p.status === 'paid' ? 'badge-active' : 'badge-inactive'}">${p.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="updatePayrollStatus('${p._id}', 'paid')">Mark Paid</button>
                </td>
            </tr>
        `).join('')
    } catch (error) {
        console.error('Error loading payrolls:', error)
    }
}

async function updatePayrollStatus(id, status) {
    try {
        await fetch(`${API_URL}/payroll/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, paidDate: new Date() })
        })
        loadPayrolls()
    } catch (error) {
        console.error('Error updating payroll:', error)
    }
}

function populateEmployeeSelect() {
    const select = document.getElementById('payrollEmployee')
    select.innerHTML = `<option value="">Select an employee</option>` +
        allEmployees.map(emp => `<option value="${emp._id}">${emp.firstname} ${emp.lastname}</option>`).join('')
}

function openAddPayrollModal() {
    document.getElementById('addPayrollModal').classList.add('show')
    document.getElementById('payrollMonth').valueAsDate = new Date()
}

function closeAddPayrollModal() {
    document.getElementById('addPayrollModal').classList.remove('show')
    document.querySelector('#addPayrollModal form').reset()
}

async function savePayroll(event) {
    event.preventDefault()
    try {
        const data = {
            employeeId: document.getElementById('payrollEmployee').value,
            month: document.getElementById('payrollMonth').value,
            bonus: Number(document.getElementById('payrollBonus').value),
            deductions: Number(document.getElementById('payrollDeductions').value)
        }
        
        await fetch(`${API_URL}/payroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        
        closeAddPayrollModal()
        loadPayrolls()
    } catch (error) {
        console.error('Error saving payroll:', error)
        alert('Error generating payroll')
    }
}

async function loadDashboard() {
    try {
        const statsRes = await fetch(`${API_URL}/stats/dashboard`)
        const stats = await statsRes.json()
        
        document.getElementById('statsTotal').textContent = stats.totalEmployees
        document.getElementById('statsActive').textContent = stats.activeEmployees
        document.getElementById('statsPayroll').textContent = '₹' + stats.totalPayroll.toLocaleString()
        document.getElementById('statsDept').textContent = stats.totalDepartments
        
        const topRes = await fetch(`${API_URL}/stats/top-performing`)
        const topEmpls = await topRes.json()
        
        const topContainer = document.getElementById('topEmployees')
        topContainer.innerHTML = topEmpls.map(emp => `
            <div style="padding: 1rem 0; border-bottom: 1px solid #f0f2f5; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 600;">${emp.firstname} ${emp.lastname}</div>
                    <div style="font-size: 12px; color: #7f8c8d;">${emp.position}</div>
                </div>
                <div style="font-size: 18px;">
                    ${[1, 2, 3, 4, 5].map(i => `<span style="color: ${i <= emp.rating ? '#ffc107' : '#e8ecf1'};">★</span>`).join('')}
                </div>
            </div>
        `).join('')
    } catch (error) {
        console.error('Error loading dashboard:', error)
    }
}

document.addEventListener('DOMContentLoaded', loadEmployees)
