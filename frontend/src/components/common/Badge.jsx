import React from 'react';

const Badge = ({ children, variant = 'default', count }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    announcement: 'badge-announcement',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`badge ${variants[variant]}`}>
      {children}
      {count !== undefined && <span className="ml-1">({count})</span>}
    </span>
  );
};

export default Badge;