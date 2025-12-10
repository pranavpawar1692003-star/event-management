import React from 'react';

function EventCard({ event, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
        }`}>
          {event.status}
        </span>
      </div>
      <div className="text-gray-600 mb-4 space-y-2">
        <p className="flex items-center gap-2">
          <span>📅</span>
          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>📍</span>
          <span>{event.location}</span>
        </p>
        <p className="text-sm text-gray-500">{event.description}</p>
      </div>
      <button
        onClick={() => onDelete(event.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
      >
        Delete Event
      </button>
    </div>
  );
}

export default EventCard;
