// import React, { useState, useEffect } from 'react';
// import Dashboard from './components/Dashboard';
// import Sidebar from './components/Sidebar';
// import { db } from './firebase';
// import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

// function App() {
//   const [events, setEvents] = useState([]);
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, 'events'), 
//       (snapshot) => {
//         const eventsData = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         console.log('Events loaded:', eventsData);
//         setEvents(eventsData);
//         setLoading(false);
//       },
//       (error) => {
//         console.error('Error loading events:', error);
//         alert('Error connecting to Firebase. Please check:\n1. Firestore is enabled in Firebase Console\n2. Security rules allow read/write access');
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const addEvent = async (event) => {
//     try {
//       console.log('Adding event:', event);
      
//       // Determine status based on event date
//       const eventDate = new Date(event.date);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
      
//       const status = eventDate < today ? 'completed' : 'upcoming';
      
//       const docRef = await addDoc(collection(db, 'events'), {
//         ...event,
//         status: status,
//         createdAt: new Date().toISOString()
//       });
//       console.log('Event added successfully with ID:', docRef.id);
//       alert(`Event created successfully as ${status}!`);
//     } catch (error) {
//       console.error('Error adding event:', error);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);
//       alert(`Failed to add event: ${error.message}\n\nPlease check:\n1. Firestore Database is enabled\n2. Security rules allow write access`);
//     }
//   };

//   const updateEvent = async (id, updatedData) => {
//     try {
//       console.log('Updating event:', id, updatedData);
      
//       // Determine status based on event date if date is being updated
//       if (updatedData.date) {
//         const eventDate = new Date(updatedData.date);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
        
//         updatedData.status = eventDate < today ? 'completed' : 'upcoming';
//       }
      
//       await updateDoc(doc(db, 'events', id), updatedData);
//       console.log('Event updated successfully');
//       alert('Event updated successfully!');
//     } catch (error) {
//       console.error('Error updating event:', error);
//       alert(`Failed to update event: ${error.message}`);
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       try {
//         await deleteDoc(doc(db, 'events', id));
//         alert('Event deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting event:', error);
//         alert('Failed to delete event.');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-xl font-semibold text-gray-700">Loading events...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
//         <Sidebar 
//           currentView={currentView} 
//           setCurrentView={(view) => {
//             setCurrentView(view);
//             setSidebarOpen(false);
//           }} 
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Mobile Header */}
//         <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <span className="text-lg">🎯</span>
//               </div>
//               <span className="font-bold text-gray-900">EventHub</span>
//             </div>
//             <div className="w-10"></div>
//           </div>
//         </div>

//         <Dashboard 
//           events={events} 
//           onAddEvent={addEvent} 
//           onUpdateEvent={updateEvent}
//           onDeleteEvent={deleteEvent}
//           currentView={currentView}
//           onViewChange={setCurrentView}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function App() {
  // ✅ All hooks are at the top (no conditional usage)
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --------------------------------------------
  // 🔥 Load Events (snapshot)
  // --------------------------------------------
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading events:", error);
        alert(
          "Error loading events from Firebase. Check Firestore settings and rules."
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // --------------------------------------------
  // ➕ Add Event
  // --------------------------------------------
  const addEvent = async (event) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const eventDate = new Date(event.date);
      const status = eventDate < today ? "completed" : "upcoming";

      await addDoc(collection(db, "events"), {
        ...event,
        status,
        createdAt: new Date().toISOString(),
      });

      alert(`Event added as ${status}`);
    } catch (error) {
      alert("Error adding event: " + error.message);
    }
  };

  // --------------------------------------------
  // ✏ Update Event
  // --------------------------------------------
  const updateEvent = async (id, updatedData) => {
    try {
      if (updatedData.date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const eventDate = new Date(updatedData.date);
        updatedData.status = eventDate < today ? "completed" : "upcoming";
      }

      await updateDoc(doc(db, "events", id), updatedData);
      alert("Event updated successfully!");
    } catch (error) {
      alert("Error updating event: " + error.message);
    }
  };

  // --------------------------------------------
  // ❌ Delete Event
  // --------------------------------------------
  const deleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        alert("Event deleted!");
      } catch (error) {
        alert("Error deleting event");
      }
    }
  };

  // --------------------------------------------
  // ⏳ Loading Screen
  // --------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 rounded-full border-b-4 border-indigo-600 mx-auto"></div>
          <p className="text-gray-700 mt-4 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------
  // Main UI
  // --------------------------------------------
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar
          currentView={currentView}
          setCurrentView={(v) => {
            setCurrentView(v);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white p-4 shadow sticky top-0 z-30 flex justify-between">
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="font-bold text-gray-900 text-lg">EventHub</div>

          <div className="w-6" />
        </div>

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
