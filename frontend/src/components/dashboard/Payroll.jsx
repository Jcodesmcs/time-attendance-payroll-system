import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const Payroll = () => {
  // 🔧 EDIT THIS: Replace with actual API call
  const [payrolls, setPayrolls] = useState([
    { period: 'March 1-15, 2024', gross: 5476.88, deductions: 735.00, net: 4741.88, status: 'paid' },
    { period: 'February 16-29, 2024', gross: 5230.50, deductions: 720.00, net: 4510.50, status: 'paid' },
    { period: 'February 1-15, 2024', gross: 5080.00, deductions: 715.00, net: 4365.00, status: 'paid' },
  ]);

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // 🔧 EDIT THIS: Replace with actual API call
  const fetchPayrolls = async () => {
    try {
      // const response = await api.get('/payroll?userId=current');
      // setPayrolls(response.data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  // 🔧 EDIT THIS: Replace with actual API call
  const viewPayslip = async (payrollId) => {
    try {
      // const response = await api.get(`/payroll/${payrollId}/payslip`);
      // setSelectedPayroll(response.data);
      // Open in new window or modal
      console.log('Viewing payslip for:', payrollId);
    } catch (error) {
      console.error('Error fetching payslip:', error);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">My Payroll History</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Year-to-Date Gross</p>
          <p className="text-2xl font-bold text-green-600">₱15,787.38</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Deductions</p>
          <p className="text-2xl font-bold text-red-600">₱2,170.00</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Net Pay</p>
          <p className="text-2xl font-bold text-blue-600">₱13,617.38</p>
        </div>
      </div>

      {/* Payroll List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{payroll.period}</td>
                <td className="px-6 py-4 whitespace-nowrap">₱{payroll.gross.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">₱{payroll.deductions.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">₱{payroll.net.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    payroll.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewPayslip(index)}
                  >
                    View Payslip
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Payroll;