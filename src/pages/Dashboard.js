import React, { useState } from 'react';
import StatsCard from '../components/StatsCard';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import CalendarView from '../components/CalendarView';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import PaymentSection from '../components/PaymentSection';

function Dashboard({ events, onAddEvent, onUpdateEvent, onDeleteEvent, currentView, onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [startDate, setStartDate] = useState('');
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    // Date filter
    let matchesDate = true;
    if (startDate) {
      const eventDate = new Date(event.date);
      matchesDate = eventDate >= new Date(startDate);
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, startDate]);
  
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const completedEvents = filteredEvents.filter(e => e.status === 'completed');
  
  const stats = [
    { title: 'Total Events', value: filteredEvents.length, icon: '📅', color: 'bg-blue-500' },
    { title: 'Upcoming', value: upcomingEvents.length, icon: '🔜', color: 'bg-green-500' },
    { title: 'Completed', value: completedEvents.length, icon: '✅', color: 'bg-purple-500' },
    { title: 'This Month', value: filteredEvents.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length, icon: '📊', color: 'bg-orange-500' }
  ];

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 h-full min-h-screen overflow-auto">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {currentView === 'dashboard' && 'Dashboard Overview'}
          {currentView === 'events' && 'All Events'}
          {currentView === 'create' && 'Create New Event'}
          {currentView === 'payments' && 'Payments'}
          {currentView === 'calendar' && 'Calendar View'}
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {currentView === 'dashboard' && 'Welcome back! Here\'s your event summary'}
          {currentView === 'events' && 'Manage all your events in one place'}
          {currentView === 'create' && 'Fill in the details to create a new event'}
          {currentView === 'payments' && 'Track payments and financial transactions'}
          {currentView === 'calendar' && 'View your events organized by month'}
        </p>
      </div>

      {currentView === 'dashboard' && (
        <>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Filter by Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                />
              </div>
              {startDate && (
                <button
                  onClick={() => setStartDate('')}
                  className="self-end px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium"
                  title="Clear date filter"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Events</h3>
                <p className="text-sm text-gray-500 mt-1">Latest {Math.min(3, filteredEvents.length)} events</p>
              </div>
              <button
                onClick={() => onViewChange('events')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <EventList events={filteredEvents.slice(0, 3)} onDelete={onDeleteEvent} onEdit={setEditingEvent} showEdit={false} />
            {filteredEvents.length > 3 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => onViewChange('events')}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  + {filteredEvents.length - 3} more events
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {currentView === 'events' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-blue-100">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Filter by Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  />
                </div>
                {startDate && (
                  <button
                    onClick={() => setStartDate('')}
                    className="self-end px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium"
                    title="Clear date filter"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  filterStatus === 'upcoming'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  filterStatus === 'completed'
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-500/30'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          {editingEvent ? (
            <div className="mb-6">
              <EventForm 
                onSubmit={(data) => {
                  onUpdateEvent(editingEvent.id, data);
                  setEditingEvent(null);
                }} 
                initialData={editingEvent}
                isEditing={true}
                onCancel={() => setEditingEvent(null)}
              />
            </div>
          ) : null}
          
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * eventsPerPage + 1, filteredEvents.length)} - {Math.min(currentPage * eventsPerPage, filteredEvents.length)} of {filteredEvents.length} events
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {Math.ceil(filteredEvents.length / eventsPerPage) || 1}
            </p>
          </div>
          
          <EventList 
            events={filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)} 
            onDelete={onDeleteEvent} 
            onEdit={setEditingEvent} 
          />
          
          {filteredEvents.length > eventsPerPage && (
            <Pagination 
              currentPage={currentPage}
              totalPages={Math.ceil(filteredEvents.length / eventsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}

      {currentView === 'create' && (
        <div className="max-w-4xl">
          <EventForm onSubmit={onAddEvent} />
        </div>
      )}

      {currentView === 'payments' && (
        <PaymentSection events={events} onUpdateEvent={onUpdateEvent} />
      )}

      {currentView === 'calendar' && (
        <>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Filter by Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                />
              </div>
              {startDate && (
                <button
                  onClick={() => setStartDate('')}
                  className="self-end px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium"
                  title="Clear date filter"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <CalendarView events={filteredEvents} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
