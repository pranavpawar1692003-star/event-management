import React, { useState } from 'react';

function PaymentSection({ events, onUpdateEvent }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(3);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentType: 'ticket',
    paymentStatus: 'pending',
    paymentMethod: 'cash'
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedEvent) {
      alert('Please select an event first');
      return;
    }

    let updatedPayments = selectedEvent.payments || [];
    
    if (editingPayment) {
      // Update existing payment
      updatedPayments = updatedPayments.map(p => 
        p.id === editingPayment.id 
          ? { ...p, ...paymentForm, amount: parseFloat(paymentForm.amount) }
          : p
      );
      alert('Payment updated successfully!');
    } else {
      // Add new payment
      updatedPayments.push({
        id: Date.now(),
        ...paymentForm,
        amount: parseFloat(paymentForm.amount),
        date: new Date().toISOString()
      });
      alert('Payment added successfully!');
    }

    onUpdateEvent(selectedEvent.id, { payments: updatedPayments });
    
    setPaymentForm({
      amount: '',
      paymentType: 'ticket',
      paymentStatus: 'pending',
      paymentMethod: 'cash'
    });
    setEditingPayment(null);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setPaymentForm({
      amount: payment.amount.toString(),
      paymentType: payment.paymentType,
      paymentStatus: payment.paymentStatus,
      paymentMethod: payment.paymentMethod
    });
  };

  const handleDeletePaymentFromHistory = (eventId, paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) {
      return;
    }

    const event = events.find(e => e.id === eventId);
    const updatedPayments = (event.payments || []).filter(p => p.id !== paymentId);
    onUpdateEvent(eventId, { payments: updatedPayments });
    
    if (editingPayment?.id === paymentId) {
      handleCancelEdit();
    }
    
    alert('Payment deleted successfully!');
  };

  const handleCancelEdit = () => {
    setEditingPayment(null);
    setPaymentForm({
      amount: '',
      paymentType: 'ticket',
      paymentStatus: 'pending',
      paymentMethod: 'cash'
    });
  };

  const getTotalRevenue = () => {
    return events.reduce((total, event) => {
      const eventPayments = event.payments || [];
      return total + eventPayments
        .filter(p => p.paymentStatus === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
    }, 0);
  };

  const getPendingPayments = () => {
    return events.reduce((total, event) => {
      const eventPayments = event.payments || [];
      return total + eventPayments
        .filter(p => p.paymentStatus === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);
    }, 0);
  };

  const getEventTotal = (event) => {
    const payments = event.payments || [];
    return payments.reduce((sum, p) => sum + p.amount, 0);
  };

  // Filter events that have payments
  const eventsWithPayments = events.filter(e => e.payments && e.payments.length > 0);
  
  // Paginate events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const paginatedEvents = eventsWithPayments.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(eventsWithPayments.length / eventsPerPage);

  return (
    <div className="space-y-6">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-3 rounded-2xl">
              <span className="text-3xl">💵</span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600">${getTotalRevenue().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-100 p-3 rounded-2xl">
              <span className="text-3xl">⏳</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-600">${getPendingPayments().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Events</p>
              <p className="text-3xl font-bold text-blue-600">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Form */}
      <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          {editingPayment ? 'Edit Payment' : 'Add Payment'}
        </h3>
          
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Event *</label>
            <select
              value={selectedEvent?.id || ''}
              onChange={(e) => setSelectedEvent(events.find(ev => ev.id === e.target.value))}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Choose an event...</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title} - {new Date(event.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Amount *</label>
              <input
                type="number"
                step="0.01"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                required
                placeholder="0.00"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Type *</label>
              <select
                value={paymentForm.paymentType}
                onChange={(e) => setPaymentForm({...paymentForm, paymentType: e.target.value})}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="ticket">Ticket Sale</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="expense">Expense</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Status *</label>
              <select
                value={paymentForm.paymentStatus}
                onChange={(e) => setPaymentForm({...paymentForm, paymentStatus: e.target.value})}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Method *</label>
              <select
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({...paymentForm, paymentMethod: e.target.value})}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="cash">Cash</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
          </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                {editingPayment ? 'Update Payment' : 'Add Payment'}
              </button>
              {editingPayment && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-4 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200 font-bold text-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

      {/* Payment History */}
      <div className="bg-white rounded-3xl shadow-sm p-4 md:p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Payment History</h3>
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>
        
        <div className="space-y-4">
          {paginatedEvents.map(event => {
            const payments = event.payments || [];

            return (
              <div key={event.id} className="border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-blue-600">${getEventTotal(event).toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {payments.map(payment => (
                    <div key={payment.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">
                            {payment.paymentType === 'ticket' && '🎫'}
                            {payment.paymentType === 'sponsorship' && '🤝'}
                            {payment.paymentType === 'expense' && '💸'}
                            {payment.paymentType === 'other' && '📝'}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-800 capitalize">{payment.paymentType}</p>
                            <p className="text-sm text-gray-500">{payment.paymentMethod} • {new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">${payment.amount.toFixed(2)}</p>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            payment.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' :
                            payment.paymentStatus === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {payment.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            handleEditPayment(payment);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePaymentFromHistory(event.id, payment.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {eventsWithPayments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No payments recorded yet</p>
              <p className="text-sm mt-2">Add your first payment to get started!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSection;
