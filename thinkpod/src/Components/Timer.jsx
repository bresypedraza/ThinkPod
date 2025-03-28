import React, {useState, useEffect, useRef} from 'react';

function Timer(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

    }, [isRunning]);

    function start(){

    }

    function stop(){

    }

    function reset(){

    }
    
    function formatTime(){

        return '00:00'
    }


    return(
    <div className='Timer'>
        <div className='bg-blue-400 rounded-lg w-auto h-auto place-self-end m-4'>
            <div className='display font-bold text-center text-5xl p-10'>{formatTime()}</div>
            <div className='controls flex-col text-center font-sans'>
                <button onClick={start} className='start-button bg-green-500 rounded m-2 w-[40px] h-[40px]'>Start</button>
                <button onClick={reset} className='reset-button bg-gray-400 rounded m-2 w-[40px] h-[40px]'>Reset</button>
                <button onClick={stop} className='stop-button bg-red-500 rounded m-2 w-[40px] h-[40px]'>Stop</button>
            </div>
        </div>
    </div>)
}

export default Timer;