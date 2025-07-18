'use client';
import React from 'react';

const Notification = ({ message }) => {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
            {message}
        </div>
    );
};

export default Notification;