"use client";

import { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const MaintenanceBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-16 left-0 right-0 z-50 bg-indigo-600 text-white border-b border-indigo-600 animate-fade-in">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                    <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                    <div>
                        <span className="font-semibold">Under Maintenance: </span>
                        We are performing scheduled maintenance. Some features may be temporarily unavailable.
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="text-white hover:text-gray-100 ml-4 p-1 transition-colors focus:outline-none"
                    aria-label="Dismiss maintenance banner"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default MaintenanceBanner;