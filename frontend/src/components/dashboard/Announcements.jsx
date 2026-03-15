import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Company Meeting',
      message: 'General assembly on Friday at 3PM',
      date: '2024-03-11',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      title: 'Payroll Schedule',
      message: 'Payroll for March will be processed on the 28th',
      date: '2024-03-10',
      priority: 'medium',
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, read: true } : a
    ));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <Badge variant="announcement" count={announcements.filter(a => !a.read).length}>
          Unread
        </Badge>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-4 rounded-lg border transition-colors cursor-pointer
              ${announcement.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-retail-red border-2'}`}
            onClick={() => markAsRead(announcement.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{announcement.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{announcement.message}</p>
            <p className="text-sm text-gray-400">{announcement.date}</p>
          </div>
        ))}

        {announcements.length === 0 && (
          <p className="text-center text-gray-500 py-8">No announcements</p>
        )}
      </div>
    </Card>
  );
};

export default Announcements;