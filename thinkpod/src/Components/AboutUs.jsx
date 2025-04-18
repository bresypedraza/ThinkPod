import React, { useState, useEffect, useRef } from 'react';
import { GiBrain } from "react-icons/gi";
import { IoIosHappy } from "react-icons/io";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

export function AboutUs(){
    return(
        <div className='bg-white p-5 flex justify-center sm:w-[45%] w-[90%] h-[53%] top-[200px] rounded-xl'>
        <div className='overflow-auto [&::-webkit-scrollbar]:hidden'>
            <h1>
                <GiBrain className='w-8 h-8 text-blue-600 mx-auto'/>
            </h1>
            <h2 className='mt-1 font-bold text-2xl'> About Thinkpod</h2>
            <p className='mt-2 text-justify text-lg'> 
                At Thinkpod, we believe that how you study matters! Our approach combines structured study
                sessions and breaks, which is grounded in evidence-based research. A study conducted by the National Library of Medicine found 
                that taking pre-determined, systematic breaks during a study 
                session leads to
            </p>
            <div className='flex justify-start mt-4 text-md'>
                <IoIosHappy className='mt-1 w-6 h-6 text-green-600'/>
                <p className='font-bold mt-1 ml-2 text-xl'> Mood Benefits</p>
            </div>
            <p className='flex justify-start mt-1 text-xl'><small> More concentration, motivation, and <br></br> interest. Less fatigue and distraction.</small></p>
            <div className='flex justify-start mt-4'>
                <BsFillRocketTakeoffFill  className='mt-1 w-6 h-6 text-red-600'/>
                <p className='font-bold mt-1 ml-2 text-xl'> Efficiency Benefits</p>
            </div>
            <p className='flex justify-start mt-1 text-xl'><small> Faster task completions in shorter time</small></p>
        </div>
    </div>
    )
}