import React from 'react';

function EventList({ events, onDelete, onEdit, showEdit = true }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full hidden md:table">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider">Event Title</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider">Date</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider">Location</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider hidden lg:table-cell">Description</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider">Status</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {events.map((event, index) => (
            <tr key={event.id} className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-semibold text-gray-900">{event.title}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700">
                {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700">{event.location}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-600 hidden lg:table-cell">{event.description}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm">
                <span className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                  event.status === 'upcoming' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md'
                }`}>
                  {event.status}
                </span>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm">
                <div className="flex gap-2">
                  {showEdit && (
                    <button
                      onClick={() => onEdit(event)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 lg:px-5 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-xs lg:text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(event.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 lg:px-5 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-xs lg:text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {event.status}
              </span>
            </div>
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              <p><span className="font-semibold">Location:</span> {event.location}</p>
              <p><span className="font-semibold">Description:</span> {event.description}</p>
            </div>
            <div className="flex gap-2">
              {showEdit && (
                <button
                  onClick={() => onEdit(event)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(event.id)}
                className={`${showEdit ? 'flex-1' : 'w-full'} bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
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
