import React from 'react';

function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', desc: 'Overview' },
    { id: 'events', label: 'All Events', icon: '📅', desc: 'Manage events' },
    { id: 'create', label: 'Create Event', icon: '➕', desc: 'Add new' },
    { id: 'payments', label: 'Payments', icon: '💰', desc: 'Track finances' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️', desc: 'Timeline view' }
  ];

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-8 border-b border-indigo-700">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Event Manager</h1>
        <p className="text-indigo-300 text-sm mt-2">Manage your events seamlessly</p>
      </div>
      
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-4 font-medium ${
              currentView === item.id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-indigo-700">
        <div className="bg-indigo-800 rounded-lg p-4">
          <p className="text-sm text-indigo-300">Need help?</p>
          <p className="text-xs text-indigo-400 mt-1">Contact support</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
