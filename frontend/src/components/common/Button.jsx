import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-retail-red text-white hover:bg-retail-redDark disabled:bg-gray-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    outline: 'border-2 border-retail-red text-retail-red hover:bg-retail-red hover:text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;