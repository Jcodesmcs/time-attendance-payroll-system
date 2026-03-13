// 🔧 EDIT THIS FILE - Replace with your actual backend API calls

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔧 EDIT THIS: Add your actual token from Firebase Auth
api.interceptors.request.use(async (config) => {
  // Get token from your auth context
  // const token = await getFirebaseToken();
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Attendance endpoints
export const attendanceAPI = {
  timeIn: (data) => api.post('/attendance/time-in', data),
  timeOut: (data) => api.post('/attendance/time-out', data),
  getRecords: (params) => api.get('/attendance', { params }),
  getSummary: (params) => api.get('/attendance/summary', { params }),
  getMonthlyAttendance: (year, month) => api.get(`/attendance/monthly/${year}/${month}`),  
};

// Leave endpoints
export const leaveAPI = {
  createRequest: (data) => api.post('/leaves/request', data),
  getRequests: (params) => api.get('/leaves/requests', { params }),
  getRequest: (id) => api.get(`/leaves/requests/${id}`),
};

// Overtime endpoints
export const overtimeAPI = {
  createRequest: (data) => api.post('/overtime/request', data),
  getRequests: (params) => api.get('/overtime/requests', { params }),
};

// Reports endpoints
export const reportsAPI = {
  createReport: (data) => api.post('/reports/work', data),
  getReports: (params) => api.get('/reports/work', { params }),
  getReport: (id) => api.get(`/reports/work/${id}`),
};

// Payroll endpoints
export const payrollAPI = {
  getMyPayroll: (params) => api.get('/payroll', { params }),
  getPayslip: (payrollId) => api.get(`/payroll/${payrollId}/payslip`),
};

// Users endpoints (admin only)
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  deactivate: (id) => api.delete(`/users/${id}`),
  updatePayrate: (id, data) => api.put(`/users/${id}/payrate`, data),
};

export default api;