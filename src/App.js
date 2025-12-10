import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

function App() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'events'), 
      (snapshot) => {
        const eventsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Events loaded:', eventsData);
        setEvents(eventsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading events:', error);
        alert('Error connecting to Firebase. Please check:\n1. Firestore is enabled in Firebase Console\n2. Security rules allow read/write access');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addEvent = async (event) => {
    try {
      console.log('Adding event:', event);
      
      // Determine status based on event date
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
      
      const status = eventDate < today ? 'completed' : 'upcoming';
      
      const docRef = await addDoc(collection(db, 'events'), {
        ...event,
        status: status,
        createdAt: new Date().toISOString()
      });
      console.log('Event added successfully with ID:', docRef.id);
      alert(`Event created successfully as ${status}!`);
    } catch (error) {
      console.error('Error adding event:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Failed to add event: ${error.message}\n\nPlease check:\n1. Firestore Database is enabled\n2. Security rules allow write access`);
    }
  };

  const updateEvent = async (id, updatedData) => {
    try {
      console.log('Updating event:', id, updatedData);
      
      // Determine status based on event date if date is being updated
      if (updatedData.date) {
        const eventDate = new Date(updatedData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        updatedData.status = eventDate < today ? 'completed' : 'upcoming';
      }
      
      await updateDoc(doc(db, 'events', id), updatedData);
      console.log('Event updated successfully');
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert(`Failed to update event: ${error.message}`);
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 overflow-auto">
        <Dashboard 
          events={events} 
          onAddEvent={addEvent} 
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>
    </div>
  );
}

export default App;
