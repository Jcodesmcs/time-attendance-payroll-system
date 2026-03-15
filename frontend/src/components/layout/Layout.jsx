import React from 'react';

const Layout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/images/background.jpg")',
          backgroundColor: '#000000'
        }}
      ></div>
      
      {/* Sidebar */}
      <div className="relative z-10">
        {sidebar}
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;