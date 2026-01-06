import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../context/AuthContext'
import DataTable from '../../../components/ui/DataTable'
import Badge from '../../../components/ui/Badge'
import { attendanceAPI } from '../../../api'

const Attendance = () => {
  const { user } = useAuth()
  const companyId = parseInt(user?.company_id || localStorage.getItem('companyId') || 1, 10)
  
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true)
      const response = await attendanceAPI.getAll({
        company_id: companyId,
        month: selectedMonth,
        year: selectedYear
      })
      if (response.data.success) {
        const attendanceData = response.data.data || []
        // Transform API data to match frontend format
        const transformedAttendance = attendanceData.map(att => {
          // Format date
          const dateObj = new Date(att.date)
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })

          // Format check-in time
          let checkIn = '-'
          if (att.check_in) {
            const checkInTime = new Date(`2000-01-01T${att.check_in}`)
            checkIn = checkInTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }

          // Format check-out time
          let checkOut = '-'
          if (att.check_out) {
            const checkOutTime = new Date(`2000-01-01T${att.check_out}`)
            checkOut = checkOutTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }

          return {
            id: att.id,
            employee: att.employee_name || 'Unknown',
            date: formattedDate,
            checkIn: checkIn,
            checkOut: checkOut,
            status: att.status || 'Absent',
            employee_email: att.employee_email,
            user_id: att.user_id,
            notes: att.notes
          }
        })
        setAttendance(transformedAttendance)
      }
    } catch (error) {
      console.error('Error fetching attendance:', error)
      alert(error.response?.data?.error || 'Failed to fetch attendance data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (companyId) {
      fetchAttendance()
    }
  }, [fetchAttendance, companyId, selectedMonth, selectedYear])

  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Date' },
    { key: 'checkIn', label: 'Check In' },
    { key: 'checkOut', label: 'Check Out' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const variant = value === 'Present' ? 'success' : value === 'Late' ? 'warning' : 'danger'
        return <Badge variant={variant}>{value}</Badge>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Attendance</h1>
          <p className="text-secondary-text mt-1">View employee attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - 2 + i
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-secondary-text">Loading attendance data...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={attendance}
          searchPlaceholder="Search attendance..."
          filters={true}
          filterConfig={[
            { 
              key: 'status', 
              label: 'Status', 
              type: 'select', 
              options: ['Present', 'Absent', 'Late', 'Half Day'] 
            },
          ]}
        />
      )}
    </div>
  )
}

export default Attendance
