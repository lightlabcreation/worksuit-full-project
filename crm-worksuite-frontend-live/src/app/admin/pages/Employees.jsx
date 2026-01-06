import { useState, useEffect, useCallback } from 'react'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { IoCreate, IoTrash, IoEye } from 'react-icons/io5'
import { employeesAPI, departmentsAPI, positionsAPI } from '../../../api'
import { useAuth } from '../../../context/AuthContext'

const Employees = () => {
  const { user } = useAuth()
  const companyId = user?.company_id || localStorage.getItem('companyId') || 1
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department_id: '',
    position_id: '',
    employee_number: '',
    joining_date: '',
    salary: '',
    status: 'Active',
  })

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Memoize fetch functions to prevent recreation
  const fetchDepartments = useCallback(async () => {
    try {
      const response = await departmentsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setDepartments(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }, [companyId])

  const fetchPositions = useCallback(async (departmentId) => {
    try {
      const response = await positionsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        let filteredPositions = response.data.data || []
        // Filter by department if provided
        if (departmentId) {
          filteredPositions = filteredPositions.filter(pos => pos.department_id === parseInt(departmentId))
        }
        setPositions(filteredPositions)
      }
    } catch (error) {
      console.error('Error fetching positions:', error)
    }
  }, [companyId])

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true)
      const response = await employeesAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        const fetchedEmployees = response.data.data || []
        // Transform API data to match component format
        const transformedEmployees = fetchedEmployees.map(emp => ({
          id: emp.id,
          name: emp.name || '',
          email: emp.email || '',
          phone: emp.phone || '',
          address: emp.address || '',
          company_id: emp.company_id,
          company_name: emp.company_name || 'Not Assigned',
          department: emp.department_name || '',
          department_id: emp.department_id,
          position: emp.position_name || '',
          position_id: emp.position_id,
          employee_number: emp.employee_number || '',
          joining_date: emp.joining_date || '',
          salary: emp.salary || '',
          role: emp.position_name || emp.role || '',
          status: emp.status || 'Active',
          user_id: emp.user_id,
        }))
        setEmployees(transformedEmployees)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }, [companyId])

  // Fetch employees and departments on component mount - parallelized for better performance
  useEffect(() => {
    Promise.all([
      fetchEmployees(),
      fetchDepartments()
    ])
  }, [fetchEmployees, fetchDepartments])

  // Refresh data when modal opens
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      fetchDepartments()
    }
  }, [isAddModalOpen, isEditModalOpen, fetchDepartments])

  // Fetch positions when department changes
  useEffect(() => {
    if (formData.department_id) {
      fetchPositions(formData.department_id)
    } else {
      fetchPositions(null)
    }
  }, [formData.department_id, fetchPositions])


  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
    { key: 'employee_number', label: 'Employee ID' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'default'}>{value}</Badge>
      ),
    },
  ]

  const handleAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      department_id: '',
      position_id: '',
      employee_number: '',
      joining_date: '',
      salary: '',
      status: 'Active',
    })
    setPassword('')
    setShowPassword(false)
    setIsAddModalOpen(true)
  }

  const handleEdit = async (employee) => {
    try {
      setLoading(true)
      const response = await employeesAPI.getById(employee.id)
      if (response.data.success) {
        const emp = response.data.data
        setSelectedEmployee(employee)
        setFormData({
          name: emp.name || '',
          email: emp.email || '',
          phone: emp.phone || '',
          address: emp.address || '',
          department_id: emp.department_id?.toString() || '',
          position_id: emp.position_id?.toString() || '',
          employee_number: emp.employee_number || '',
          joining_date: emp.joining_date || '',
          salary: emp.salary || '',
          status: emp.status || 'Active',
        })
        // Fetch positions for the selected department
        if (emp.department_id) {
          await fetchPositions(emp.department_id)
        } else {
          await fetchPositions(null)
        }
        setIsEditModalOpen(true)
      }
    } catch (error) {
      console.error('Failed to fetch employee:', error)
      alert(error.response?.data?.error || 'Failed to fetch employee details')
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (employee) => {
    try {
      setLoading(true)
      const response = await employeesAPI.getById(employee.id)
      if (response.data.success) {
        setSelectedEmployee(response.data.data)
        setIsViewModalOpen(true)
      }
    } catch (error) {
      console.error('Failed to fetch employee:', error)
      setSelectedEmployee(employee)
      setIsViewModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.name.trim()) {
      alert('Name is required')
      return
    }

    if (!formData.email || !formData.email.trim()) {
      alert('Email is required')
      return
    }

    if (isAddModalOpen && !password) {
      alert('Password is required for new employee')
      return
    }

    try {
      setSaving(true)
      
      const employeeData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone || null,
        address: formData.address || null,
        company_id: parseInt(companyId), // Auto-set from session
        department_id: formData.department_id ? parseInt(formData.department_id) : null,
        position_id: formData.position_id ? parseInt(formData.position_id) : null,
        employee_number: formData.employee_number || null,
        joining_date: formData.joining_date || null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
        role: 'EMPLOYEE',
        status: formData.status,
      }

      if (isAddModalOpen) {
        employeeData.password = password
      }

      console.log('Saving employee with data:', employeeData)

      if (isEditModalOpen && selectedEmployee) {
        const response = await employeesAPI.update(selectedEmployee.id, employeeData)
        if (response.data.success) {
          alert('Employee updated successfully!')
          await fetchEmployees()
          setIsEditModalOpen(false)
          setSelectedEmployee(null)
        } else {
          alert(response.data.error || 'Failed to update employee')
        }
      } else {
        const response = await employeesAPI.create(employeeData)
        if (response.data.success) {
          alert(`Employee created successfully!\n\nLogin Credentials:\nEmail: ${formData.email}\nPassword: ${password}\nRole: EMPLOYEE`)
          await fetchEmployees()
          setIsAddModalOpen(false)
          setPassword('')
          setShowPassword(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            department_id: '',
            position_id: '',
            employee_number: '',
            joining_date: '',
            salary: '',
            status: 'Active',
          })
        } else {
          alert(response.data.error || 'Failed to create employee')
        }
      }
    } catch (error) {
      console.error('Error saving employee:', error)
      alert(error.response?.data?.error || 'Failed to save employee')
    } finally {
      setSaving(false)
    }
  }

  const actions = (row) => (
    <div className="flex items-center justify-end gap-1 sm:gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleView(row)
        }}
        className="p-1.5 sm:p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
      >
        <IoEye size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleEdit(row)
        }}
        className="p-1.5 sm:p-2 text-warning hover:bg-warning hover:bg-opacity-10 rounded transition-colors"
      >
        <IoCreate size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={async (e) => {
          e.stopPropagation()
          if (window.confirm(`Delete ${row.name}?`)) {
            try {
              // Note: Backend should handle cascading delete of user account
              await employeesAPI.delete(row.id)
              alert('Employee deleted successfully!')
              await fetchEmployees()
            } catch (error) {
              console.error('Error deleting employee:', error)
              alert(error.response?.data?.error || 'Failed to delete employee')
            }
          }
        }}
        className="p-1.5 sm:p-2 text-danger hover:bg-danger hover:bg-opacity-10 rounded transition-colors"
      >
        <IoTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-text">Employees</h1>
          <p className="text-sm sm:text-base text-secondary-text mt-1">Manage employee information</p>
        </div>
        <AddButton onClick={handleAdd} label="Add Employee" />
      </div>

      <DataTable
        columns={columns}
        data={employees}
        searchPlaceholder="Search employees..."
        filters={true}
        filterConfig={[
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
          { key: 'phone', label: 'Phone', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          { key: 'position', label: 'Position', type: 'text' },
          { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
        ]}
        actions={actions}
        bulkActions={true}
        mobileColumns={2}
      />

      <RightSideModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedEmployee(null)
          setPassword('')
          setShowPassword(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            department_id: '',
            position_id: '',
            employee_number: '',
            joining_date: '',
            salary: '',
            status: 'Active',
          })
        }}
        title={isAddModalOpen ? 'Add New Employee' : 'Edit Employee'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter employee name"
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
            <Input
              label="Employee ID"
              value={formData.employee_number}
              onChange={(e) => setFormData({ ...formData, employee_number: e.target.value })}
              placeholder="Auto-generated if empty"
            />
          </div>
          {/* Company ID - Hidden field (auto-set from session) */}
          <input type="hidden" name="company_id" value={companyId} />
          
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Department
            </label>
            <select
              value={formData.department_id}
              onChange={(e) => {
                const selectedDeptId = e.target.value
                setFormData({ 
                  ...formData, 
                  department_id: selectedDeptId,
                  position_id: '' // Reset position when department changes
                })
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {departments.length === 0 && (
              <p className="text-xs text-secondary-text mt-1">No departments available. Please add departments first.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Position
            </label>
            <select
              value={formData.position_id}
              onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              disabled={!formData.department_id}
            >
              <option value="">
                {formData.department_id ? '-- Select Position --' : '-- Select Department First --'}
              </option>
              {positions
                .filter(pos => !formData.department_id || pos.department_id === parseInt(formData.department_id))
                .map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.name}
                  </option>
                ))}
            </select>
            {formData.department_id && positions.filter(pos => pos.department_id === parseInt(formData.department_id)).length === 0 && (
              <p className="text-xs text-secondary-text mt-1">No positions available for selected department</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Joining Date
              </label>
              <Input
                type="date"
                value={formData.joining_date}
                onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
              />
            </div>
            <Input
              label="Salary"
              type="number"
              step="0.01"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              rows={3}
              placeholder="Enter address"
            />
          </div>
          {isAddModalOpen && (
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1.5 sm:mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password for login"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-text hover:text-primary-text"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-xs text-secondary-text mt-1">
                This password will be used for employee login
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-1.5 sm:mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
              }}
              className="px-4"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="px-4" disabled={saving}>
              {saving ? 'Saving...' : (isAddModalOpen ? 'Save Employee' : 'Update Employee')}
            </Button>
          </div>
        </div>
      </RightSideModal>

      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Employee Details"
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-text">Name</label>
              <p className="text-primary-text mt-1 text-base font-semibold">{selectedEmployee.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Email</label>
              <p className="text-primary-text mt-1 text-base break-all">{selectedEmployee.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Phone</label>
              <p className="text-primary-text mt-1 text-base">{selectedEmployee.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Company Name</label>
              <p className="text-primary-text mt-1 text-base">{selectedEmployee.company_name || 'Not Assigned'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Department</label>
              <p className="text-primary-text mt-1 text-base">{selectedEmployee.department_name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Position</label>
              <p className="text-primary-text mt-1 text-base">{selectedEmployee.position_name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Employee ID</label>
              <p className="text-primary-text mt-1 text-base">{selectedEmployee.employee_number || 'N/A'}</p>
            </div>
            {selectedEmployee.joining_date && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Joining Date</label>
                <p className="text-primary-text mt-1 text-base">
                  {new Date(selectedEmployee.joining_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
            {selectedEmployee.salary && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Salary</label>
                <p className="text-primary-text mt-1 text-base">${parseFloat(selectedEmployee.salary).toLocaleString()}</p>
              </div>
            )}
            {selectedEmployee.address && (
              <div>
                <label className="text-sm font-medium text-secondary-text">Address</label>
                <p className="text-primary-text mt-1 text-base">{selectedEmployee.address}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-secondary-text">Status</label>
              <div className="mt-1">
                <Badge variant={selectedEmployee.status === 'Active' ? 'success' : 'default'}>
                  {selectedEmployee.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </RightSideModal>
    </div>
  )
}

export default Employees
