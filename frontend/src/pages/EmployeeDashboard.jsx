import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import AttendanceCalendar from '../components/dashboard/AttendanceCalendar';
import MyRecords from '../components/dashboard/MyRecords';
import Announcements from '../components/dashboard/Announcements';
import WorkReport from '../components/dashboard/WorkReport';
import OTRequest from '../components/dashboard/OTRequest';
import LeaveRequest from '../components/dashboard/LeaveRequest';
import Settings from '../components/dashboard/Settings';
import Payroll from '../components/dashboard/Payroll';
import ManageUsers from '../components/dashboard/ManageUsers';

const EmployeeDashboard = () => {
  const [activeView, setActiveView] = useState('calendar'); // Changed default to 'calendar'
  // 🔧 EDIT THIS: Get actual user role from auth context
  const userRole = 'employee'; // 'admin', 'supervisor', 'manager', 'hr'

  const renderContent = () => {
    switch(activeView) {
      case 'calendar':
        return <AttendanceCalendar />;
      case 'records':
        return <MyRecords />;
      case 'announcements':
        return <Announcements />;
      case 'work-report':
        return <WorkReport />;
      case 'ot-request':
        return <OTRequest />;
      case 'leave-request':
        return <LeaveRequest />;
      case 'settings':
        return <Settings />;
      case 'payroll':
        return <Payroll />;
      case 'manage-users':
        return <ManageUsers />;
      case 'logout':
        // 🔧 EDIT THIS: Add actual logout function
        console.log('Logging out...');
        return null;
      default:
        return <AttendanceCalendar />;
    }
  };

  return (
    <Layout
      sidebar={
        <Sidebar
          activeItem={activeView}
          onItemClick={setActiveView}
          userRole={userRole}
        />
      }
    >
      {renderContent()}
    </Layout>
  );
};

export default EmployeeDashboard;