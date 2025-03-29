import './App.css';
import React, {useState, useEffect} from 'react';
import Timer from'./Components/Timer.jsx';


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
    },[]);

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
