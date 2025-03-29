import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Timer from'./Components/Timer.jsx';
import {backgroundSelection} from './BackgroundHandler';


function App() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  useEffect(() => {
    async function displayBackGroundSettings(){
      return await backgroundSelection();
    }
    displayBackGroundSettings()
  }, []);

  return (
    <div className="App h-screen w-screen bg-gray-100 flex flex-col items-center justify-center overflow-hidden h0">
      <header className="App-header">
        
      </header>
      
      <body className="bg-gray-100">
        <Timer />
        <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Hello, World!</h1>
          <p className="text-gray-600 mt-2">React and Tailwind is finally ready!</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Click Me
          </button>
        </div>

        <div className="background_setting absolute w-2/3 h-2/3 bg-gray-rgba bg-opacity-50 font-bold overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] rounded-xl p-5">
          <div> 
            <span  className="text-3xl flex items-center justify-center m-4">Background Setting</span> 
          </div>
          
        </div>
        </div>  

        <iframe 
          src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ" 
          className="w-[500px] h-[100px] items-end"
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>   
      </body>
    </div>
  );
}

export default App;
