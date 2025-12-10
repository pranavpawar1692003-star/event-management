import React from 'react';

function CalendarView({ events }) {
  const groupedEvents = events.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      {Object.entries(groupedEvents).map(([month, monthEvents]) => (
        <div key={month} className="mb-10">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 border-b-2 border-indigo-200 pb-3">{month}</h3>
          <div className="space-y-4">
            {monthEvents.map(event => (
              <div key={event.id} className="flex items-center gap-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-200 border border-indigo-100">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-2xl text-center min-w-[100px] shadow-lg">
                  <div className="text-3xl font-bold">{new Date(event.date).getDate()}</div>
                  <div className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-800 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </p>
                </div>
                <div className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-md ${
                  event.status === 'upcoming' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                }`}>
                  {event.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CalendarView;
