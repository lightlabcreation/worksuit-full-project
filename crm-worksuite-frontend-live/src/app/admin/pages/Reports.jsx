import { useState, useEffect, useCallback } from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { reportsAPI, clientsAPI, employeesAPI } from '../../../api'
import { IoDownload, IoRefresh, IoPieChart, IoBarChart, IoPeople, IoFolder, IoTrendingUp, IoBusiness, IoPerson, IoFilter, IoCheckmarkCircle, IoTime, IoHourglass } from 'react-icons/io5'

const Reports = () => {
  const [clients, setClients] = useState([])
  const [employees, setEmployees] = useState([])
  
  // Filter states
  const [filterType, setFilterType] = useState('all') // 'all', 'client', 'employee'
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [salesData, setSalesData] = useState([])
  const [salesTotal, setSalesTotal] = useState({ revenue: 0, paid: 0, unpaid: 0, count: 0 })
  const [revenueData, setRevenueData] = useState([])
  const [revenueTotal, setRevenueTotal] = useState({ revenue: 0, paid: 0, unpaid: 0, invoices: 0 })
  const [projectStatusData, setProjectStatusData] = useState([])
  const [projectsList, setProjectsList] = useState([])
  const [projectTotal, setProjectTotal] = useState({ projects: 0, budget: 0 })
  const [employeePerformanceData, setEmployeePerformanceData] = useState([])
  const [employeeSummary, setEmployeeSummary] = useState({ 
    total_employees: 0, excellent: 0, good: 0, fair: 0, average: 0,
    total_tasks: 0, total_completed: 0, total_projects: 0, total_hours: 0
  })
  
  // Get company ID from localStorage
  const companyId = localStorage.getItem('companyId') || '1'

  useEffect(() => {
    fetchClients()
    fetchEmployees()
  }, [])

  useEffect(() => {
    fetchAllReports()
  }, [filterType, selectedClient, selectedEmployee, dateRange])

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll({ company_id: companyId })
      const clientData = response.data?.data || response.data || []
      setClients(Array.isArray(clientData) ? clientData : [])
    } catch (error) {
      console.error('Error fetching clients:', error)
      setClients([])
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await employeesAPI.getAll({ company_id: companyId })
      const employeeData = response.data?.data || response.data || []
      setEmployees(Array.isArray(employeeData) ? employeeData : [])
    } catch (error) {
      console.error('Error fetching employees:', error)
      setEmployees([])
    }
  }

  const fetchAllReports = useCallback(async () => {
    try {
      setLoading(true)
      const params = {
        company_id: companyId,
        ...(dateRange.startDate && { start_date: dateRange.startDate }),
        ...(dateRange.endDate && { end_date: dateRange.endDate })
      }
      
      // Add client or employee filter based on selection
      if (filterType === 'client' && selectedClient) {
        params.client_id = selectedClient
      } else if (filterType === 'employee' && selectedEmployee) {
        params.employee_id = selectedEmployee
        params.user_id = selectedEmployee
      }

      console.log('Fetching reports with params:', params)

      // Fetch all reports in parallel
      const [salesRes, revenueRes, projectsRes, employeesRes] = await Promise.all([
        reportsAPI.getSalesReport(params).catch(err => {
          console.error('Sales API error:', err)
          return { data: { success: true, data: [], total: {} } }
        }),
        reportsAPI.getRevenueReport({ ...params, period: 'monthly' }).catch(err => {
          console.error('Revenue API error:', err)
          return { data: { success: true, data: [], total: {} } }
        }),
        reportsAPI.getProjectStatusReport(params).catch(err => {
          console.error('Projects API error:', err)
          return { data: { success: true, data: [], projects: [], total: {} } }
        }),
        reportsAPI.getEmployeePerformanceReport(params).catch(err => {
          console.error('Employees API error:', err)
          return { data: { success: true, data: [], summary: {} } }
        })
      ])

      console.log('API Responses:', { salesRes, revenueRes, projectsRes, employeesRes })
      console.log('Employee Response Detail:', JSON.stringify(employeesRes?.data, null, 2))

      // Process Sales Data
      if (salesRes.data?.success) {
        const formatted = (salesRes.data.data || []).map(item => ({
          name: item.month_name || item.month || 'N/A',
          revenue: parseFloat(item.revenue || 0),
          count: parseInt(item.count || 0),
          paid: parseFloat(item.paid || 0),
          unpaid: parseFloat(item.unpaid || 0)
        }))
        setSalesData(formatted)
        setSalesTotal(salesRes.data.total || {
          revenue: formatted.reduce((s, d) => s + d.revenue, 0),
          paid: formatted.reduce((s, d) => s + d.paid, 0),
          unpaid: formatted.reduce((s, d) => s + d.unpaid, 0),
          count: formatted.reduce((s, d) => s + d.count, 0)
        })
      }

      // Process Revenue Data
      if (revenueRes.data?.success) {
        const formatted = (revenueRes.data.data || []).map(item => ({
          name: item.period || 'N/A',
          revenue: parseFloat(item.total_revenue || 0),
          paid: parseFloat(item.total_paid || 0),
          unpaid: parseFloat(item.total_unpaid || 0),
          count: parseInt(item.invoice_count || 0)
        }))
        setRevenueData(formatted)
        setRevenueTotal(revenueRes.data.total || {
          revenue: formatted.reduce((s, d) => s + d.revenue, 0),
          paid: formatted.reduce((s, d) => s + d.paid, 0),
          unpaid: formatted.reduce((s, d) => s + d.unpaid, 0),
          invoices: formatted.reduce((s, d) => s + d.count, 0)
        })
      }

      // Process Project Status Data
      if (projectsRes.data?.success) {
        const formatted = (projectsRes.data.data || []).map(item => ({
          name: item.status || 'Unknown',
          value: parseInt(item.count || 0),
          budget: parseFloat(item.total_budget || 0)
        }))
        setProjectStatusData(formatted)
        setProjectsList(projectsRes.data.projects || [])
        setProjectTotal(projectsRes.data.total || {
          projects: formatted.reduce((s, d) => s + d.value, 0),
          budget: formatted.reduce((s, d) => s + d.budget, 0)
        })
      }

      // Process Employee Performance Data
      if (employeesRes.data?.success) {
        setEmployeePerformanceData(employeesRes.data.data || [])
        setEmployeeSummary(employeesRes.data.summary || { 
          total_employees: 0, excellent: 0, good: 0, fair: 0, average: 0,
          total_tasks: 0, total_completed: 0, total_projects: 0, total_hours: 0
        })
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }, [companyId, filterType, selectedClient, selectedEmployee, dateRange])

  const handleExportPDF = () => {
    // Get filter label
    let filterLabel = 'All Data'
    if (filterType === 'client' && selectedClient) {
      const client = clients.find(c => c.id == selectedClient)
      filterLabel = `Client: ${client?.name || client?.client_name || 'Selected Client'}`
    } else if (filterType === 'employee' && selectedEmployee) {
      const emp = employees.find(e => e.id == selectedEmployee)
      filterLabel = `Employee: ${emp?.name || emp?.email || 'Selected Employee'}`
    }
    
    // Create printable content
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Reports - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .section h2 { color: #555; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; }
            .filter-badge { display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #3730a3; border-radius: 20px; font-size: 14px; margin-bottom: 10px; }
            .summary-box { display: inline-block; margin: 5px 10px; padding: 10px; background: #f9fafb; border-radius: 8px; }
            .summary-value { font-size: 18px; font-weight: bold; color: #3b82f6; }
            .summary-label { font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <h1>Business Reports</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p class="filter-badge">${filterLabel}</p>
          ${dateRange.startDate ? `<p>Date Range: ${dateRange.startDate} to ${dateRange.endDate || 'Present'}</p>` : ''}
          
          <div class="section">
            <h2>Sales Report</h2>
            <div>
              <span class="summary-box"><span class="summary-value">$${salesTotal.revenue?.toLocaleString() || 0}</span><br/><span class="summary-label">Total Revenue</span></span>
              <span class="summary-box"><span class="summary-value">$${salesTotal.paid?.toLocaleString() || 0}</span><br/><span class="summary-label">Total Paid</span></span>
              <span class="summary-box"><span class="summary-value">$${salesTotal.unpaid?.toLocaleString() || 0}</span><br/><span class="summary-label">Total Unpaid</span></span>
            </div>
            <table>
              <tr><th>Month</th><th>Revenue</th><th>Invoices</th><th>Paid</th><th>Unpaid</th></tr>
              ${salesData.map(d => `<tr><td>${d.name}</td><td>$${d.revenue.toLocaleString()}</td><td>${d.count}</td><td>$${d.paid.toLocaleString()}</td><td>$${d.unpaid.toLocaleString()}</td></tr>`).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Revenue Report</h2>
            <div>
              <span class="summary-box"><span class="summary-value">${revenueTotal.invoices || 0}</span><br/><span class="summary-label">Total Invoices</span></span>
              <span class="summary-box"><span class="summary-value">$${revenueTotal.revenue?.toLocaleString() || 0}</span><br/><span class="summary-label">Total Revenue</span></span>
            </div>
            <table>
              <tr><th>Period</th><th>Total Revenue</th><th>Paid</th><th>Unpaid</th></tr>
              ${revenueData.map(d => `<tr><td>${d.name}</td><td>$${d.revenue.toLocaleString()}</td><td>$${d.paid.toLocaleString()}</td><td>$${d.unpaid.toLocaleString()}</td></tr>`).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Project Status</h2>
            <div>
              <span class="summary-box"><span class="summary-value">${projectTotal.projects || 0}</span><br/><span class="summary-label">Total Projects</span></span>
              <span class="summary-box"><span class="summary-value">$${projectTotal.budget?.toLocaleString() || 0}</span><br/><span class="summary-label">Total Budget</span></span>
            </div>
            <table>
              <tr><th>Status</th><th>Count</th><th>Budget</th></tr>
              ${projectStatusData.map(d => `<tr><td>${d.name}</td><td>${d.value}</td><td>$${d.budget.toLocaleString()}</td></tr>`).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Employee Performance</h2>
            <div>
              <span class="summary-box"><span class="summary-value">${employeeSummary.total_employees || 0}</span><br/><span class="summary-label">Total Employees</span></span>
              <span class="summary-box"><span class="summary-value">${employeeSummary.total_completed || 0}</span><br/><span class="summary-label">Tasks Completed</span></span>
              <span class="summary-box"><span class="summary-value">${employeeSummary.total_projects || 0}</span><br/><span class="summary-label">Projects</span></span>
              <span class="summary-box"><span class="summary-value">${employeeSummary.total_hours || 0}h</span><br/><span class="summary-label">Hours Logged</span></span>
            </div>
            <table>
              <tr><th>Name</th><th>Designation</th><th>Tasks Completed</th><th>In Progress</th><th>Projects</th><th>Hours</th><th>Rating</th></tr>
              ${employeePerformanceData.map(d => `<tr><td>${d.name}</td><td>${d.designation || '-'}</td><td>${d.tasks_completed || 0}</td><td>${d.tasks_in_progress || 0}</td><td>${d.projects_assigned || 0}</td><td>${d.hours_logged || 0}</td><td>${d.rating || 'N/A'}</td></tr>`).join('')}
            </table>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Custom Bar Chart Component
  const BarChart = ({ data, dataKey, label, color = '#3B82F6' }) => {
    if (!data || data.length === 0) return null
    const maxValue = Math.max(...data.map(d => d[dataKey] || 0)) || 1
    
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex items-end gap-2 px-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                style={{ 
                  height: `${Math.max((item[dataKey] / maxValue) * 100, 5)}%`,
                  backgroundColor: color,
                  minHeight: '4px'
                }}
                title={`${item.name}: $${item[dataKey]?.toLocaleString() || 0}`}
              />
              <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-gray-400 mt-2">{label}</div>
      </div>
    )
  }

  // Custom Donut Chart Component
  const DonutChart = ({ data, colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'] }) => {
    if (!data || data.length === 0) return null
    
    const total = data.reduce((sum, d) => sum + (d.value || 0), 0) || 1
    let currentAngle = 0
    
    return (
      <div className="w-full h-full flex items-center justify-center gap-4">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, idx) => {
              const percentage = (item.value / total) * 100
              const angle = (percentage / 100) * 360
              const startAngle = currentAngle
              currentAngle += angle
              
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)
              const largeArc = angle > 180 ? 1 : 0
              
              return (
                <path
                  key={idx}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[idx % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              )
            })}
            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">{total}</span>
          </div>
        </div>
        <div className="space-y-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
              <span className="text-gray-600">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Rating Badge Component
  const RatingBadge = ({ rating }) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-700',
      'Good': 'bg-blue-100 text-blue-700',
      'Fair': 'bg-yellow-100 text-yellow-700',
      'Average': 'bg-gray-100 text-gray-700'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[rating] || colors['Average']}`}>
        {rating}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">View and export business reports</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={fetchAllReports}
          >
            <IoRefresh size={18} />
            <span>Refresh</span>
          </Button>
          <Button 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={handleExportPDF}
          >
            <IoDownload size={18} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <IoFilter size={20} className="text-blue-600" />
          <span className="font-medium text-gray-900">Filter Reports</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Report Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report For
            </label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setSelectedClient('')
                setSelectedEmployee('')
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="all">All (Company Wide)</option>
              <option value="client">Client Specific</option>
              <option value="employee">Employee Specific</option>
            </select>
          </div>

          {/* Client Filter */}
          {filterType === 'client' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-1">
                  <IoBusiness className="text-blue-500" size={16} />
                  Select Client
                </span>
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">All Clients</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name || client.client_name || client.company_name || `Client #${client.id}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Employee Filter */}
          {filterType === 'employee' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-1">
                  <IoPerson className="text-green-500" size={16} />
                  Select Employee
                </span>
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name || emp.email || `Employee #${emp.id}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Active Filter Badge */}
        {(filterType !== 'all' || dateRange.startDate) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filterType === 'client' && selectedClient && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                <IoBusiness size={14} />
                {clients.find(c => c.id == selectedClient)?.name || clients.find(c => c.id == selectedClient)?.client_name || 'Client'}
                <button onClick={() => setSelectedClient('')} className="ml-1 hover:text-blue-900">×</button>
              </span>
            )}
            {filterType === 'employee' && selectedEmployee && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <IoPerson size={14} />
                {employees.find(e => e.id == selectedEmployee)?.name || employees.find(e => e.id == selectedEmployee)?.email || 'Employee'}
                <button onClick={() => setSelectedEmployee('')} className="ml-1 hover:text-green-900">×</button>
              </span>
            )}
            {dateRange.startDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {dateRange.startDate} - {dateRange.endDate || 'Today'}
                <button onClick={() => setDateRange({ startDate: '', endDate: '' })} className="ml-1 hover:text-gray-900">×</button>
              </span>
            )}
          </div>
        )}
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500">Loading reports...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Report */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IoTrendingUp className="text-blue-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Sales Report</h3>
            </div>
            <div className="h-64">
              {salesData.length > 0 ? (
                <BarChart data={salesData} dataKey="revenue" label="Monthly Sales Revenue" color="#3B82F6" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <IoBarChart size={48} className="mb-2 opacity-50" />
                  <p>No sales data available</p>
                  <p className="text-sm">Create invoices to see sales data</p>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">${(salesTotal.revenue || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${(salesTotal.paid || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Paid</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">${(salesTotal.unpaid || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Unpaid</p>
              </div>
            </div>
          </Card>

          {/* Revenue Report */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IoBarChart className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Revenue Report</h3>
            </div>
            <div className="h-64">
              {revenueData.length > 0 ? (
                <BarChart data={revenueData} dataKey="revenue" label="Monthly Revenue" color="#10B981" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <IoBarChart size={48} className="mb-2 opacity-50" />
                  <p>No revenue data available</p>
                  <p className="text-sm">Create invoices to see revenue data</p>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{revenueTotal.invoices || 0}</p>
                <p className="text-xs text-gray-500">Total Invoices</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">${(revenueTotal.revenue || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
            </div>
          </Card>

          {/* Project Status */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IoFolder className="text-purple-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Project Status</h3>
            </div>
            <div className="h-64">
              {projectStatusData.length > 0 && projectStatusData.some(d => d.value > 0) ? (
                <DonutChart 
                  data={projectStatusData} 
                  colors={['#8B5CF6', '#3B82F6', '#F59E0B', '#10B981', '#EF4444']} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <IoPieChart size={48} className="mb-2 opacity-50" />
                  <p>No project data available</p>
                  <p className="text-sm">Create projects to see status data</p>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{projectTotal.projects || 0}</p>
                <p className="text-xs text-gray-500">Total Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${(projectTotal.budget || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Budget</p>
              </div>
            </div>
            
            {/* Projects List */}
            {projectsList.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Projects</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {projectsList.slice(0, 5).map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <span className="font-medium text-gray-900">{project.project_name || 'Project'}</span>
                        <span className="text-gray-500 ml-2">({project.client_name || project.client_company_name || 'No client'})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        project.status?.toLowerCase().includes('completed') ? 'bg-green-100 text-green-700' :
                        project.status?.toLowerCase().includes('progress') ? 'bg-blue-100 text-blue-700' :
                        project.status?.toLowerCase().includes('hold') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status || 'Unknown'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Employee Performance */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IoPeople className="text-orange-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Employee Performance</h3>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-blue-600">{employeeSummary.total_employees || 0}</p>
                <p className="text-xs text-gray-500">Employees</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-green-600">{employeeSummary.total_completed || 0}</p>
                <p className="text-xs text-gray-500">Tasks Done</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-purple-600">{employeeSummary.total_projects || 0}</p>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-orange-600">{employeeSummary.total_hours || 0}h</p>
                <p className="text-xs text-gray-500">Hours</p>
              </div>
            </div>
            
            <div className="h-64 overflow-y-auto">
              {employeePerformanceData.length > 0 ? (
                <div className="space-y-3">
                  {employeePerformanceData.map((emp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {(emp.name || 'E').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{emp.name || 'Employee'}</p>
                          <p className="text-xs text-gray-500">{emp.designation || emp.email || ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <IoCheckmarkCircle className="text-green-500" size={14} />
                            <span className="font-semibold text-green-600">{emp.tasks_completed || 0}</span>
                          </div>
                          <p className="text-xs text-gray-400">Done</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <IoTime className="text-blue-500" size={14} />
                            <span className="font-semibold text-blue-600">{emp.tasks_in_progress || 0}</span>
                          </div>
                          <p className="text-xs text-gray-400">Progress</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <IoHourglass className="text-orange-500" size={14} />
                            <span className="font-semibold text-orange-600">{emp.tasks_pending || 0}</span>
                          </div>
                          <p className="text-xs text-gray-400">Pending</p>
                        </div>
                        <RatingBadge rating={emp.rating} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <IoPeople size={48} className="mb-2 opacity-50" />
                  <p>No employee data available</p>
                  <p className="text-sm">Add employees to see performance data</p>
                </div>
              )}
            </div>
            
            {/* Rating Summary */}
            {employeePerformanceData.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1 text-sm">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Excellent: {employeeSummary.excellent || 0}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Good: {employeeSummary.good || 0}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    Fair: {employeeSummary.fair || 0}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                    Average: {employeeSummary.average || 0}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

export default Reports
