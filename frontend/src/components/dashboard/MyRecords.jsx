import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const MyRecords = () => {
  // 🔧 EDIT THIS: Replace with actual API call to backend
  const [records, setRecords] = useState([
    { date: '2024-03-10', timeIn: '08:00', timeOut: '17:00', total: '9.0', status: 'completed' },
    { date: '2024-03-09', timeIn: '08:15', timeOut: '17:00', total: '8.75', status: 'late' },
    { date: '2024-03-08', timeIn: '08:00', timeOut: '17:30', total: '9.5', status: 'overtime' },
  ]);

  // 🔧 EDIT THIS: Replace with actual API call
  const fetchRecords = async () => {
    try {
      // const response = await api.get('/attendance');
      // setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'late': return 'text-red-600 bg-red-100';
      case 'overtime': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">My Attendance Records</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Hours This Week</p>
          <p className="text-2xl font-bold text-blue-600">42.5</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">On Time Days</p>
          <p className="text-2xl font-bold text-green-600">18</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Overtime Hours</p>
          <p className="text-2xl font-bold text-yellow-600">5.5</p>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.timeIn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.timeOut}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MyRecords;