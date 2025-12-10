import React from 'react';

function EventList({ events, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Event Title</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Location</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Description</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {events.map((event, index) => (
            <tr key={event.id} className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{event.title}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{event.location}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{event.description}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                  event.status === 'upcoming' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md'
                }`}>
                  {event.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No events found</p>
          <p className="text-sm mt-2">Create your first event to get started!</p>
        </div>
      )}
    </div>
  );
}

export default EventList;
