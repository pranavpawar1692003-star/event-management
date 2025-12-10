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
    <div className="w-80 h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-blue-800/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">EventHub</h1>
            <p className="text-blue-300 text-xs">Professional Events</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group relative overflow-hidden ${
              currentView === item.id 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' 
                : 'text-blue-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className={`text-3xl transition-transform duration-300 ${
              currentView === item.id ? 'scale-110' : 'group-hover:scale-110'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className={`font-semibold text-base ${currentView === item.id ? 'text-white' : ''}`}>
                {item.label}
              </div>
              <div className={`text-xs ${currentView === item.id ? 'text-blue-100' : 'text-blue-400'}`}>
                {item.desc}
              </div>
            </div>
            {currentView === item.id && (
              <div className="w-1.5 h-8 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
