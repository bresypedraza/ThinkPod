import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { FcEmptyTrash } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";


export function ToDoList({showTasks, setTasks, showCheckMark, setCheckMark}){
    const [shouldSlide, setShouldSlide] = useState(false);

    useEffect(() => {
        setShouldSlide(true);
    },[]);


    return(
        <div className=
        {`relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center sm:w-[40vw] sm:h-[20vw] w-[60vw] h-[50vw]
        ${shouldSlide ? `translate-x-0`  : `translate-x-full`}
        transition-transform duration-500 ease-out`}>
            <div className='  overflow-auto [&::-webkit-scrollbar]:hidden'>
                <div className='flex justify-center items-center p-2 space-x-3'>
                    <h1 className='font-gruppo text-xl font-bold'>
                        To Do List
                    </h1>
                    <GiNotebook className='w-8 h-6 text-yellow-500'/>
                </div>
                <SearchBarAndButton setTasks={setTasks} setCheckMark={setCheckMark}/>
                <div className='flex flex-col'>
                    {showTasks.map((task, index) =>  <TaskPlanBox showTasks={showTasks} setTasks={setTasks} showCheckMark={showCheckMark}  setCheckMark={setCheckMark} index={index} key={index}/> )}
                </div>
            </div>
        </div>
    );
}


function SearchBarAndButton({setTasks, setCheckMark}){
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
    const handleCheckMarkState = ()=>{
        setCheckMark(prev=> [...prev, false]);
    }
    return(
        <div className='flex justify-center'>
            <input
                className='p-2 font-gruppo rounded-xl sm:w-[200px] w-[60%] border-[3px] border-solid border-[#555]'
                type="text"
                value={searchTerm}
                placeholder='Add a plan'
                onChange={handleInputChange}
            />
            <button 
            className='bg-gradient-to-r from-amber-500 to-pink-500 sm:w-[100px] w-[35%] ml-2 rounded-xl font-gruppo '
            onClick={()=> {
                setTasks(prev => [...prev, searchTerm])
                handleCheckMarkState();
                setSearchTerm('');
            }}> 
                Add
            </button>
        </div>
    );
}

function TaskPlanBox({showTasks, setTasks, showCheckMark, setCheckMark, index}){
    const[showIsEditing, setIsEditing]=useState(false);


    const handleIsChecked = () => {
        const checkState = showCheckMark.map((checkBox, idx) => 
            {if(idx==index) return !checkBox; else return checkBox}
        );
         setCheckMark(checkState);
    };

    const handleTaskDeletion =()=> {
        setTasks(showTasks.filter((_, idx)=> idx != index));
        setCheckMark(showCheckMark.filter((_, idx)=> idx != index))
    }

    return(
            <div className='bg-soft-gray relative mt-4 rounded-lg font-gruppo sm:w-[30vw] h-[50px] w-[48vw] pl-[1vw] flex items-center ' >
                <label>
                    <input 
                        className='checkbox'
                        type='checkbox'
                        onChange={handleIsChecked}
                        key={index}
                        checked={showCheckMark[index]}
                    />
                    <span 
                        className={`checkbox 
                        ${showCheckMark ? 'checkbox--active' : ''}`
                        }>
                    </span>
                </label>
                <HandleInlineEdit taskName={showTasks[index]} showTasks={showTasks} setTasks={setTasks} showIsEditing={showIsEditing} setIsEditing={setIsEditing} index={index}/>
                <div className='flex ml-auto mr-[5px]'>
                    <CiEdit 
                    className='w-4 h-4 mr-2 text-red-600'
                    onClick={()=> setIsEditing('true')}/>
                    <FcEmptyTrash 
                    className='w-4 h-4' 
                    onClick={handleTaskDeletion}/>
                </div>
            </div>
        );
}

function HandleInlineEdit({taskName, showTasks, setTasks, showIsEditing, setIsEditing, index}){
    const handleBlur = () =>{
       return setIsEditing(false);
    }

    const handleEnterKey = (e)=>{
        if (e.key === 'Enter'){
            return setIsEditing(false);
        }
    }

    const handleTaskNameChange = (event)=>{
        const taskChange = showTasks.map((task, idx)=> 
            {if (idx==index) return event.target.value; 
                else return  task}
        );
        setTasks(taskChange);
    }

    return(
       <div>
           {showIsEditing ? (
               <input
               value={taskName}
               onChange={handleTaskNameChange}
               onBlur={handleBlur}
               onKeyDown={handleEnterKey}
               className='ml-1 p-1 rounded-xl sm:w-[10vw] w-[25vw]'
               />
           ):(
               <p className='ml-2 whitespace-normal text-xs'> 
                   {taskName}
               </p>
           )}
       </div>
    );
}