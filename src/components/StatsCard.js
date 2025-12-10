import React from 'react';

function StatsCard({ title, value, icon, color }) {
  const gradients = {
    'bg-blue-500': 'from-blue-500 to-blue-600',
    'bg-green-500': 'from-green-500 to-emerald-600',
    'bg-purple-500': 'from-purple-500 to-pink-600',
    'bg-orange-500': 'from-orange-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-4xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${gradients[color]} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
