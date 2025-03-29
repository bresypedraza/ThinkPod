import React, {useState, useEffect, useRef} from 'react';

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 10) minutes = '0' + minutes;
    if (seconds <= 10) seconds = '0' + seconds;
    return minutes + ":" + seconds;
}

function Timer({seconds}){
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();


    useEffect(() => {
        if(countdown <= 0) {
            clearInterval(timerId.current)
            alert("END")
        }
    })

    function Start(){
        useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
        }, [])
    }

    function stop(){

    }

    function reset(){

    }


    return(
    <div className='Timer'>
        <div className='bg-blue-500 rounded-lg w-auto h-auto place-self-end m-4'>
            <div className='display font-bold text-center text-5xl p-10'>{formatTime(countdown)}</div>
            <div className='controls flex-col text-center font-sans'>
                <button onClick={Start} className='start-button bg-green-500 rounded m-2 w-[40px] h-[40px]'>Start</button>
                <button onClick={reset} className='reset-button bg-gray-400 rounded m-2 w-[40px] h-[40px]'>Reset</button>
                <button onClick={stop} className='stop-button bg-red-500 rounded m-2 w-[40px] h-[40px]'>Stop</button>
            </div>
        </div>
    </div>)
}

export default Timer;