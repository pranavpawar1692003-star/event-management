import React from 'react';

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
