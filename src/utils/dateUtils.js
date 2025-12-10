// Utility function to determine event status based on date
export const getEventStatus = (eventDate) => {
  const date = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  
  return date < today ? 'completed' : 'upcoming';
};

// Check if an event date is in the past
export const isPastDate = (eventDate) => {
  const date = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return date < today;
};

// Format date for display
export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
