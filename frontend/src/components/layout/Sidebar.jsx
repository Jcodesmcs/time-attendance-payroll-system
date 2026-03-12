import React, { useState } from 'react';
import { 
  FiClock, 
  FiBell, 
  FiFileText, 
  FiCalendar, 
  FiSettings, 
  FiDollarSign, 
  FiUsers, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import ProfilePicture from '../common/ProfilePicture';

const Sidebar = ({ activeItem, onItemClick, userRole = 'employee' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'calendar', label: 'Dashboard Calendar', icon: FiCalendar, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'records', label: 'My Records', icon: FiClock, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'announcements', label: 'Announcements', icon: FiBell, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'], badge: 2 },
    { id: 'work-report', label: 'Work Report', icon: FiFileText, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'ot-request', label: 'OT Request', icon: FiClock, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'leave-request', label: 'Leave Request', icon: FiCalendar, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'settings', label: 'Settings', icon: FiSettings, roles: ['employee', 'admin', 'supervisor', 'manager', 'hr'] },
    { id: 'divider-1', divider: true },
    { id: 'executive-only', label: 'EXECUTIVE ACCESS ONLY', header: true, roles: ['admin', 'supervisor', 'manager', 'hr'] },
    { id: 'payroll', label: 'Payroll', icon: FiDollarSign, roles: ['admin', 'manager', 'hr'] },
    { id: 'manage-users', label: 'Manage Users', icon: FiUsers, roles: ['admin', 'hr'] },
    { id: 'divider-2', divider: true },
  ];

  const filteredItems = menuItems.filter(item => {
    if (item.divider) return true;
    if (item.header) return true;
    if (!item.roles) return false;
    return item.roles.includes(userRole);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-retail-red text-white rounded-full shadow-lg"
      >
        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar - Simplified to just be part of page flow */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 bg-gray-900 bg-opacity-95 backdrop-blur-sm
        border-r border-gray-800 h-full
      `}>
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <ProfilePicture size="sidebar" editable={false} className="mb-3" />
            <div className="text-center">
              <p className="text-xs text-gray-400">Welcome back,</p>
              <h1 className="text-xl font-bold text-retail-red">Lorenz Monfero</h1>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            {filteredItems.map((item) => {
              if (item.divider) {
                return <hr key={item.id} className="my-4 border-gray-800" />;
              }
              
              if (item.header) {
                return (
                  <p key={item.id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                    {item.label}
                  </p>
                );
              }

              const Icon = item.icon;
              const isActive = activeItem === item.id;
              const isLogout = item.id === 'logout';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-retail-red text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                    ${isLogout ? 'text-red-400 hover:bg-red-900 hover:text-red-300' : ''}
                  `}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-retail-red text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={() => {
                onItemClick('logout');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-red-300 transition-all duration-200"
            >
              <FiLogOut size={18} />
              <span className="flex-1 text-left text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;