import axiosInstance from './axiosInstance'

export const attendanceAPI = {
  // CRUD operations
  getAll: (params) => axiosInstance.get('/attendance', { params }),
  getById: (id, params) => axiosInstance.get(`/attendance/${id}`, { params }),
  create: (data) => axiosInstance.post('/attendance', data),
  update: (id, data, params) => axiosInstance.put(`/attendance/${id}`, data, { params }),
  delete: (id, params) => axiosInstance.delete(`/attendance/${id}`, { params }),
  
  // Special endpoints
  getMonthlyCalendar: (params) => axiosInstance.get('/attendance/calendar', { params }),
  getAttendancePercentage: (params) => axiosInstance.get('/attendance/percentage', { params }),
  getTodayStatus: (params) => axiosInstance.get('/attendance/today', { params }),
  checkIn: (data) => axiosInstance.post('/attendance/check-in', data),
  checkOut: (data) => axiosInstance.post('/attendance/check-out', data),
}

