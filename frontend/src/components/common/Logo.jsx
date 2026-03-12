import React from 'react';

const Logo = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',  // 80x80 pixels
    '3xl': 'w-24 h-24',  // 96x96 pixels
    '4xl': 'w-32 h-32'   // 128x128 pixels
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden shadow-lg ${className}`}>
      <img 
        src="/images/logo.png"
        alt="Logo"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback red circle if image doesn't exist
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23B91C1C"/><text x="50" y="70" font-size="50" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">R</text></svg>';
        }}
      />
    </div>
  );
};

export default Logo;