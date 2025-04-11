import './App.css';
import React, {useState, useEffect} from 'react';
import {Timer} from'./Components/Timer.jsx';
import { BackgroundSelection, ChangeBackground } from './Components/BackgroundHandler.jsx';



function App() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  {/*These are states that will be updated in the website.*/}
  const[currentTime, setCurrentTime] = useState(1);
  const [backgroundVideo, setBackgroundVideo] = useState(null);
  const[backgroundThemeOptions, showBackgroundThemeOptions] = useState("All");

  useEffect(() => {
    
    fetch('http://127.0.0.1:5000/time')
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
    });

    },[]);

  return (
    <div className="App h-screen flex flex-col">
      <header>
        <button className="bg-white text-black p-2 rounded-lg">
          Click me
        </button>
        <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
      </header>
      <Timer seconds={1500}/>
      <ChangeBackground videoUrl={backgroundVideo}/>
      <div className="background_window flex items-center justify-center">
        <div className="background_setting absolute bg-gray-rgba mt-[0px] bg-opacity-50 font-bold overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] rounded-xl p-5">
          <div className="ThemeSelector display flex gap-4">
            <div className="flex justify-center w-8 bg-soft-white rounded-md rounded p-1"  onClick={()=> {showBackgroundThemeOptions("All")}}> 
              All
            </div>
            <div className="flex justify-center w-8 bg-soft-white rounded-md rounded p-1" onClick={()=> {showBackgroundThemeOptions("Snow")}}>
              <i class="em em-snowman" aria-role="presentation" aria-label=""></i>
            </div>
            <div className="flex justify-center w-8 bg-soft-white rounded-md rounded p-1" onClick={()=> {showBackgroundThemeOptions("Ocean")}}>
              <i class="em em-ocean" aria-role="presentation" aria-label="WATER WAVE"></i>
            </div>
            <div className="flex justify-center w-8 bg-soft-white rounded-md rounded p-1" onClick={()=> {showBackgroundThemeOptions("Cozy")}}>
              <i class="em em-couch_and_lamp" aria-role="presentation" aria-label=""></i>
            </div>
            <div className="flex justify-center w-8 bg-soft-white rounded-md rounded p-1" onClick={()=> {showBackgroundThemeOptions("Space")}}>
              <i class="em em-milky_way" aria-role="presentation" aria-label="MILKY WAY"></i>
            </div>
          </div>
          <div> 
            <span  className="text-3xl flex justify-center m-4">Background Setting</span> 
          </div>
          <BackgroundSelection setBackgroundVideo={setBackgroundVideo} vidOptions={backgroundThemeOptions}/>
        </div>
      </div>  
        <iframe 
          src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ" 
          className="w-[500px] h-[100px] p-[10px]"
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>   
    </div>
  );
}

export default App;
