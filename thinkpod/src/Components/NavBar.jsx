import React from 'react';
import sideeye from './sideeye.jpg';

export function Navigation () {
    return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-3 flex space-x-8 items-center z-50">
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <img src={sideeye} className="w-6 h-6" alt="icon"/>
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <img src={sideeye} className="w-6 h-6" alt="icon"/>
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <img src={sideeye} className="w-6 h-6" alt="icon"/>
      </a>
    </nav>
    )
}