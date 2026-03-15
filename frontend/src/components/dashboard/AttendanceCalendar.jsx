import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  // 🔧 EDIT THIS: Replace with actual API call to fetch attendance data
  useEffect(() => {
    // Sample attendance data for demonstration
    const fetchAttendance = async () => {
      try {
        // const response = await api.get('/attendance');
        // setAttendanceData(response.data);
        
        // Sample data for demo
        const sampleData = {};
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
          const date = new Date(today.getFullYear(), today.getMonth(), i);
          const dateStr = date.toISOString().split('T')[0];
          
          // Random attendance status for demo
          const rand = Math.random();
          if (rand < 0.6) sampleData[dateStr] = 'on-time';
          else if (rand < 0.8) sampleData[dateStr] = 'late';
          else sampleData[dateStr] = 'absent';
        }
        setAttendanceData(sampleData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };
    
    fetchAttendance();
    
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // 🔧 EDIT THIS: Replace with actual API call for time in
  const handleTimeIn = async () => {
    try {
      // const response = await api.post('/attendance/time-in');
      // setClockInTime(response.data.timeIn);
      setClockInTime(new Date().toLocaleTimeString());
      setIsClockedIn(true);
      
      // Update today's attendance in calendar
      const todayStr = new Date().toISOString().split('T')[0];
      setAttendanceData(prev => ({
        ...prev,
        [todayStr]: 'on-time'
      }));
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  // 🔧 EDIT THIS: Replace with actual API call for time out
  const handleTimeOut = async () => {
    try {
      // const response = await api.post('/attendance/time-out');
      setIsClockedIn(false);
      setClockInTime(null);
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay(); // 0 = Sunday
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getAttendanceStatus = (date) => {
    if (!date) return null;
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData[dateStr];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-time': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      default: return 'bg-gray-700'; // Darker for empty days
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const days = getMonthDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().toDateString();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Current Time and Time In Section */}
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-400">Current Date & Time</p>
            <p className="text-2xl font-bold text-white">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-xl font-semibold text-gray-300 mt-1">
              {formatTime(currentTime)}
            </p>
          </div>
          
          <div className="flex gap-4">
            {!isClockedIn ? (
              <button
                onClick={handleTimeIn}
                className="px-8 py-4 bg-retail-red hover:bg-red-700 text-white font-bold rounded-lg text-xl transition-colors shadow-lg"
              >
                TIME IN
              </button>
            ) : (
              <div className="text-center">
                <p className="text-green-400 font-semibold mb-2">
                  ✓ Clocked in at {clockInTime}
                </p>
                <button
                  onClick={handleTimeOut}
                  className="px-6 py-2 border-2 border-retail-red text-retail-red hover:bg-retail-red hover:text-white rounded-lg transition-colors"
                >
                  TIME OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Section - Centered and Smaller */}
      <div className="flex justify-center">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700 w-full max-w-3xl">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {formatDate(currentDate)}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => changeMonth(-1)}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 bg-retail-red text-white rounded hover:bg-red-700 transition-colors text-sm"
              >
                Today
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                →
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-sm justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
              <span className="text-gray-300">On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-500 rounded"></div>
              <span className="text-gray-300">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
              <span className="text-gray-300">Absent</span>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map(day => (
              <div key={day} className="text-center font-semibold text-gray-400 py-2 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              if (!date) {
                return (
                  <div 
                    key={`empty-${index}`} 
                    className="aspect-square bg-gray-900 rounded-lg border border-gray-700"
                  ></div>
                );
              }
              
              const status = getAttendanceStatus(date);
              const isToday = date.toDateString() === today;
              const dateStr = date.getDate();
              
              // Get border color based on status
              const getBorderColor = (status) => {
                switch(status) {
                  case 'on-time': return 'border-green-500';
                  case 'late': return 'border-yellow-500';
                  case 'absent': return 'border-red-500';
                  default: return 'border-gray-700';
                }
              };
              
              return (
                <div
                  key={date.toISOString()}
                  className={`
                    aspect-square bg-gray-900 rounded-lg border-2 
                    ${getBorderColor(status)}
                    hover:border-retail-red hover:border-2 transition-all cursor-pointer
                    relative flex items-center justify-center
                  `}
                  onClick={() => console.log('Selected date:', date.toDateString())}
                >
                  {/* Date number */}
                  <span className="text-white font-medium text-sm z-10">
                    {dateStr}
                  </span>
                  
                  {/* Today indicator - Red circle in the middle */}
                  {isToday && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-4 border-retail-white animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-400">On Time</p>
              <p className="text-2xl font-bold text-green-500">
                {Object.values(attendanceData).filter(s => s === 'on-time').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Late</p>
              <p className="text-2xl font-bold text-yellow-500">
                {Object.values(attendanceData).filter(s => s === 'late').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Absent</p>
              <p className="text-2xl font-bold text-red-500">
                {Object.values(attendanceData).filter(s => s === 'absent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern - Black with subtle red grid */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B91C1C" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#000000" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default AttendanceCalendar;