import './App.css';
import React, {useState, useEffect} from 'react';
import Timer from'./Components/Timer.jsx';
import {backgroundSelection} from './BackgroundHandler';


function App() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  //practice variable to ensure flask and react set up properly
  const[currentTime, setCurrentTime] = useState(1);

  /** 
   * empty list means that useEffect has no dependencies
   * added to make sure that it is not invoked everytime the state changes 
  */
  useEffect(() => {
    
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });

    async function displayBackGroundSettings(){
      return await backgroundSelection();
    }
    displayBackGroundSettings()
    },[]);

  return (
    <div className="App">
      
      <body className="screen bg-gray-100">
      <header>
        <button className="bg-white text-black p-2 rounded-lg">
          Click me
        </button>
      </header>
        <Timer />
      <div className="min-h-screen flex items-center justify-center">

      <div className="background_setting absolute w-2/3 h-2/3 bg-gray-rgba bg-opacity-50 font-bold overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] rounded-xl p-5">
        <div> 
          <span  className="text-3xl flex items-center justify-center m-4">Background Setting</span> 
        </div>
        
      </div>
      </div>  

        {/* This is just to make sure that the flask and react are properly connected*/}
        <p>
          The current time is {currentTime}.
        </p>

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
