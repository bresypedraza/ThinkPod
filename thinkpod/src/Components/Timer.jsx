// ----- Timer Component ----- //

import React, {useState, useEffect, useRef} from 'react';

export function Timer({seconds}) {
    const [countdown, setCountdown] = useState(seconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useState(null);
    // const timerId = useRef();


    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
              setCountdown((prevSeconds) => prevSeconds - 1);
            }, 1000);
          } else {
            clearInterval(intervalRef.current);
          }
          return () => clearInterval(intervalRef.current);
        }, [isActive]);

    
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
    
        if (minutes <= 10) minutes = '0' + minutes;
        if (seconds <= 10) seconds = '0' + seconds;
        return minutes + ":" + seconds;
    }
    
    function handleStart() {
        setIsActive(true);
    }

    function handleStop() {
        setIsActive(false);
    }

    function handleReset() {
        setIsActive(false);
        setCountdown(1500);
    }
    
    return(
    <div className='Timer'>
        <div className='bg-blue-500 rounded-lg w-auto h-auto place-self-end m-4'>
            <div className='display font-bold text-center text-5xl p-10 opacity-90'>{formatTime(countdown)}</div>
            <div className='controls flex-col text-center font-sans'>
                {!isActive ? (
                    <button onClick={handleStart} className='start-button bg-green-500 rounded m-2 w-[40px] h-[40px] hover:bg-green-700'>Start</button>
                ) : (
                    <button onClick={handleStop} className='stop-button bg-red-500 rounded m-2 w-[40px] h-[40px] hover:bg-red-700'>Stop</button>
                )}
                <button onClick={handleReset} className='reset-button bg-gray-400 rounded m-2 w-[40px] h-[40px] hover:bg-gray-700'>Reset</button>
            </div>
        </div>
    </div>)
}