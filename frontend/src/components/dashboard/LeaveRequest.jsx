import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
    contactDuringLeave: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔧 EDIT THIS: Replace with actual API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // const response = await api.post('/leaves/request', formData);
      console.log('Leave Request:', formData);
      setSubmitStatus({ type: 'success', message: 'Leave request submitted successfully!' });
      
      setFormData({
        leaveType: 'sick',
        startDate: '',
        endDate: '',
        reason: '',
        contactDuringLeave: ''
      });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit request.' });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Leave Request</h2>

      {submitStatus && (
        <div className={`mb-4 p-3 rounded-lg ${
          submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red"
          >
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="emergency">Emergency Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Leave
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Explain your reason for leave..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number During Leave
          </label>
          <input
            type="tel"
            name="contactDuringLeave"
            value={formData.contactDuringLeave}
            onChange={handleChange}
            required
            placeholder="e.g., 09171234567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => setFormData({
            leaveType: 'sick', startDate: '', endDate: '', reason: '', contactDuringLeave: ''
          })}>
            Clear
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LeaveRequest;