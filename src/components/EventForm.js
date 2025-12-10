import React, { useState } from 'react';

function EventForm({ onSubmit, initialData = null, isEditing = false, onCancel = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      date: '',
      location: '',
      description: ''
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', date: '', location: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Annual Tech Conference"
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="e.g., San Francisco Convention Center"
          className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Provide details about your event..."
          className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          rows="4"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200 font-bold text-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
