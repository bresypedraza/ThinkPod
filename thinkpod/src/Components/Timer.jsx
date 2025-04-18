// ----- Timer Component ----- //

import React, { useState, useEffect, useRef } from 'react';
import alarm from './chiptune-alarm-clock.mp3';

export function Timer({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (countdown === 0) {
            setIsActive(false);
            setHasFinished(true);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
    }, [countdown]);

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

        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return minutes + ":" + seconds;
    }

    function handleStart() {
        setIsActive(true);
        setHasFinished(false);
    }

    function handleStop() {
        setIsActive(false);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    function handleReset() {
        setIsActive(false);
        setCountdown(seconds);
        setHasFinished(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    return (
        <div className="p-2 flex justify-end font-gruppo">
            <div className="bg-[rgba(128,128,128,0.5)] bg-opacity-50 rounded-lg drop-shadow p-6 md:w-72 flex flex-col items-center text-2xl">
                <div className="text-5xl font-bold text-center text-white mb-4 opacity-90">
                    {formatTime(countdown)}
                </div>
                <div className="flex flex-row gap-4 w-full justify-center">
                    {!isActive && !hasFinished ? (
                        <button
                            onClick={handleStart}
                            role='button'
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded drop-shadow transition-all duration-200"
                        >
                            Start
                        </button>
                    ) : null}

                    {isActive ? (
                        <button
                            onClick={handleStop}
                            role='button'
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded drop-shadow transition-all duration-200"
                        >
                            Stop
                        </button>
                    ) : null}

                    <button
                        onClick={handleReset}
                        role='button'
                        className="bg-gray-400 hover:bg-gray-700 text-white font-semibold py-2 px-8 rounded drop-shadow transition-all duration-200"
                    >
                        Reset
                    </button>
                </div>

                <audio ref={audioRef} src={alarm} preload="auto" />
            </div>
        </div>
    )

}