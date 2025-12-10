import React, { useState } from 'react';
import StatsCard from './StatsCard';
import EventList from './EventList';
import EventForm from './EventForm';
import CalendarView from './CalendarView';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PaymentSection from './PaymentSection';

function Dashboard({ events, onAddEvent, onUpdateEvent, onDeleteEvent, currentView, onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);
  
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const completedEvents = filteredEvents.filter(e => e.status === 'completed');
  
  const stats = [
    { title: 'Total Events', value: filteredEvents.length, icon: '📅', color: 'bg-blue-500' },
    { title: 'Upcoming', value: upcomingEvents.length, icon: '🔜', color: 'bg-green-500' },
    { title: 'Completed', value: completedEvents.length, icon: '✅', color: 'bg-purple-500' },
    { title: 'This Month', value: filteredEvents.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length, icon: '📊', color: 'bg-orange-500' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {currentView === 'dashboard' && 'Dashboard Overview'}
          {currentView === 'events' && 'All Events'}
          {currentView === 'create' && 'Create New Event'}
          {currentView === 'payments' && 'Payments'}
          {currentView === 'calendar' && 'Calendar View'}
        </h2>
        <p className="text-gray-600 mt-2">
          {currentView === 'dashboard' && 'Welcome back! Here\'s your event summary'}
          {currentView === 'events' && 'Manage all your events in one place'}
          {currentView === 'create' && 'Fill in the details to create a new event'}
          {currentView === 'payments' && 'Track payments and financial transactions'}
          {currentView === 'calendar' && 'View your events organized by month'}
        </p>
      </div>

      {currentView === 'dashboard' && (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-200">
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
            <EventList events={filteredEvents.slice(0, 3)} onDelete={onDeleteEvent} onEdit={setEditingEvent} />
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
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex flex-col gap-4 mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  filterStatus === 'upcoming'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  filterStatus === 'completed'
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
        <div className="max-w-3xl">
          <EventForm onSubmit={onAddEvent} />
        </div>
      )}

      {currentView === 'payments' && (
        <PaymentSection events={events} onUpdateEvent={onUpdateEvent} />
      )}

      {currentView === 'calendar' && (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CalendarView events={filteredEvents} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
