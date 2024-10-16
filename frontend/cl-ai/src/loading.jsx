import React from 'react';

const LoadingNotification = ({ message, progress }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3 text-center">
                <h2 className="font-bold text-lg mb-2">{message}</h2>
                <div className="h-2 bg-gray-200 rounded mb-4">
                    <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${progress}%`, transition: 'width 0.5s' }}
                    ></div>
                </div>
                <p>Please wait...</p>
            </div>
        </div>
    );
};

export default LoadingNotification;
