import React from 'react';
import sideeye from './sideeye.jpg';

export function Navigation ({toggleTimer, toggleBgSelector, toggleSpotify}) {
    return (
        <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-3 flex space-x-8 items-center z-50">
            <button onClick={toggleTimer} className="text-gray-600 hover:text-blue-500">
                <img src={sideeye} className="w-6 h-6" alt="Toggle Timer" />
            </button>
            <button onClick={toggleBgSelector} className="text-gray-600 hover:text-blue-500">
                <img src={sideeye} className="w-6 h-6" alt="Background Selector" />
            </button>
            <button onClick={toggleSpotify} className="text-gray-600 hover:text-blue-500">
                <img src={sideeye} className="w-6 h-6" alt="Spotify Embed" />
            </button>
        </nav>
    )
}