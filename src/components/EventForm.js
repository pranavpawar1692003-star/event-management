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
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Annual Tech Conference"
            className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
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
            className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="e.g., San Francisco Convention Center"
          className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Provide details about your event..."
          className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none shadow-sm"
          rows="4"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl"
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
