import './App.css';
import React, { useState, useEffect } from 'react';
import { Timer } from './Components/Timer.jsx';
import { Navigation } from './Components/NavBar.jsx';
import { BackgroundSelection, ChangeBackground } from './Components/BackgroundHandler.jsx';
import BackgroundHandler from './Components/BackgroundHandler.jsx';
import { FaLightbulb } from "react-icons/fa6"; 
import {Login} from './Components/Login.jsx';


function App() {

  /*These are states that will be updated in the website.*/
  const [showBackgroundVideo, setBackgroundVideo] = useState(null);
  useEffect(() => {
    async function fetchDefaultBg() {
      const bgHandler = new BackgroundHandler();
      const [[videoUrl]] = await bgHandler.getDefaultBackground()
      setBackgroundVideo(videoUrl);
    }

    fetchDefaultBg();
  }, [])
  const [showBackgroundThemeOptions, setBackgroundThemeOptions] = useState("All");
  const [showTimer, setShowTimer] = useState(false);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [showSpotify, setSpotify] = useState(false);
  const [showAccountProfile, setAccountProfile] = useState(false);



  return (
    <div className="App h-screen flex flex-col">

      {/*Header with styling*/}
      <header className="title h-[8%] flex justify-start text-4xl text-white p-2">
        <FaLightbulb /> ThinkPod
        <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
      </header>

      {/* Timer Popup */}
      <div
        style={{
          opacity: showTimer ? 1 : 0,
          pointerEvents: showTimer ? 'auto' : 'none',
        }}
      >
        <Timer seconds={1500} />
      </div>

      {/* Background Selector */}
        {/* Always Display Background */}
      <ChangeBackground videoUrl={showBackgroundVideo} />
      <div
        style={{
          opacity: showBgSelector ? 1 : 0,
          pointerEvents: showBgSelector ? 'auto' : 'none',
        }}>
          <div className="background_window flex items-center justify-center">
            <div className="background_setting absolute bg-gray-rgba mt-[0px] bg-opacity-50 font-bold overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] 
            [scrollbar-width:'none'] rounded-xl p-5 sm:w-[37%] w-[90%] sm:top-[100px] h-[53%] top-[200px]">
              <div className="ThemeSelector grid grid-flow-col  gap-1 sm:gap-4 grid-cols-[auto_auto_auto_auto_1fr] sm:grid-cols-[auto_auto_auto_auto_1fr]">
                <div className="w-8 bg-soft-white rounded-md rounded p-1" onClick={() => { setBackgroundThemeOptions("All") }}>
                  All
                </div>
                <div className="w-8 bg-soft-white rounded-md rounded p-1" onClick={() => { setBackgroundThemeOptions("Snow") }}>
                  <i class="em em-snowman" aria-role="presentation" aria-label=""></i>
                </div>
                <div className="w-8 bg-soft-white rounded-md rounded p-1" onClick={() => { setBackgroundThemeOptions("Ocean") }}>
                  <i class="em em-ocean" aria-role="presentation" aria-label="WATER WAVE"></i>
                </div>
                <div className="w-8 bg-soft-white rounded-md rounded p-1" onClick={() => { setBackgroundThemeOptions("Cozy") }}>
                  <i class="em em-couch_and_lamp" aria-role="presentation" aria-label=""></i>
                </div>
                <div className="w-8 bg-soft-white rounded-md rounded p-1" onClick={() => { setBackgroundThemeOptions("Space") }}>
                  <i class="em em-milky_way" aria-role="presentation" aria-label="MILKY WAY"></i>
                </div>
                <button className="saveButton text-xs ">
                    Save
                </button>
              </div>
              <div>
                <span className="text-3xl flex justify-center m-4">Background Setting</span>
              </div>
                <BackgroundSelection setBackgroundVideo={setBackgroundVideo} vidOptions={showBackgroundThemeOptions} />
            </div>
          </div>
      </div>

      {/* Spotify Embed */}
      <div
        className=" i fixed bottom-0 left-0 z-50"
        style={{
          display: showSpotify ? 'block' : 'none',
          pointerEvents: showSpotify ? 'auto' : 'none',
        }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ"
          className="w-[500px] h-[100px] p-[10px]"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Embed"
        ></iframe>
      </div>
      
      {/* Login Popup */}
      <div className=
        {`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm 
        ${showAccountProfile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-300`}>
        <div className = "login_window" >
        <Login />
        </div>
      </div>

      {/* Navigation Bar */}
      <Navigation toggleTimer={() => setShowTimer(prev => !prev)} toggleBgSelector={() => setShowBgSelector(prev => !prev)} toggleSpotify={() => setSpotify(prev => !prev)} toggleAccountProfile={() => setAccountProfile(prev => !prev)} />
    </div>
  );
}

export default App;
