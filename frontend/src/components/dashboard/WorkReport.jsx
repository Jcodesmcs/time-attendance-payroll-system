import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const WorkReport = () => {
  const [formData, setFormData] = useState({
    weekEnding: '',
    summary: '',
    achievements: '',
    challenges: ''
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
      // const response = await api.post('/reports/work', formData);
      console.log('Report submitted:', formData);
      setSubmitStatus({ type: 'success', message: 'Work report submitted successfully!' });
      
      // Clear form
      setFormData({
        weekEnding: '',
        summary: '',
        achievements: '',
        challenges: ''
      });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit report. Please try again.' });
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Submit Work Report</h2>

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
            Week Ending Date
          </label>
          <input
            type="date"
            name="weekEnding"
            value={formData.weekEnding}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary of Work Done
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe what you accomplished this week..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Achievements
          </label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            rows={3}
            placeholder="List your main achievements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Challenges Faced
          </label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows={3}
            placeholder="Any challenges or issues you encountered..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red focus:border-transparent"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => setFormData({
            weekEnding: '',
            summary: '',
            achievements: '',
            challenges: ''
          })}>
            Clear
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default WorkReport;