import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { FcEmptyTrash } from "react-icons/fc";


export function ToDoList({showTasks, setTasks, showCheckMark, setCheckMark}){
    const [shouldSlide, setShouldSlide] = useState(false);

    useEffect(() => {
        setShouldSlide(true);
    },[]);

    const handleDeletion = (task)=>{
        setTasks(showTasks.filter(item=> item !== task ));
    }

    return(
        <div className=
        {`relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center sm:w-[40vw] sm:h-[20vw] w-[60vw] h-[50vw]
        ${shouldSlide ? `translate-x-0`  : `translate-x-full`}
        transition-transform duration-500 ease-out`}>
            <div className='  overflow-auto [&::-webkit-scrollbar]:hidden'>
                <h1 className='font-gruppo text-xl font-bold'>
                    To Do List
                </h1>
                <SearchBarAndButton setTasks={setTasks} setCheckMark={setCheckMark}/>
                <div className='flex flex-col'>
                    {showTasks.map((task, index) =>  <TaskPlanBox taskName={task} onDelete={()=> handleDeletion(task)} showCheckMark={showCheckMark}  setCheckMark={setCheckMark} index={index}/> )}
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
        // const newCheckBoxState = (prev)=> [...prev, false];
        setCheckMark(prev=> [...prev, false]);
    }
    return(
        <div className='flex'>
            <input
                className='p-2 font-gruppo rounded-xl'
                type="text"
                value={searchTerm}
                placeholder='Add a plan'
                onChange={handleInputChange}
                style={{
                    width: '100%',
                    border: '3px solid #555'
                }}
            />
            <button 
            className='bg-gradient-to-r from-amber-500 to-pink-500 w-[50%] rounded-xl'
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

function TaskPlanBox({taskName, onDelete, showCheckMark, setCheckMark, index}){
    const[showIsEditing, setIsEditing]=useState(false);
    const[isVisible, setVisibility] = useState(true);


    const handleIsChecked = () => {
        const checkState = showCheckMark.map((checkBox, idx) => 
            {if(idx==index) return !checkBox; else return checkBox}
        );
         setCheckMark(checkState);
    };

    return(
         isVisible &&(
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
                <HandleInlineEdit taskName={taskName} showIsEditing={showIsEditing} setIsEditing={setIsEditing}/>
                <div className='flex ml-auto mr-[5px]'>
                    <CiEdit 
                    className='w-4 h-4 mr-2 text-red-600'
                    onClick={()=> setIsEditing('true')}/>
                    <FcEmptyTrash 
                    className='w-4 h-4' 
                    onClick={
                        onDelete
                    }/>
                </div>
            </div>
        )
    );
}

function HandleInlineEdit({taskName, showIsEditing, setIsEditing}){
    const[showTaskName, setTaskName] = useState({taskName});

    const handleBlur = () =>{
       return setIsEditing(false);
    }

    const handleEnterKey = (e)=>{
        if (e.key === 'Enter'){
            return setIsEditing(false);
        }
    }

    return(
       <div>
           {showIsEditing ? (
               <input
               value={showTaskName.taskName}
               onChange={(event)=> setTaskName({taskName: event.target.value })}
               onBlur={handleBlur}
               onKeyDown={handleEnterKey}
               className='ml-1 p-1 rounded-xl sm:w-[10vw] w-[25vw]'
               />
           ):(
               <p className='ml-2 whitespace-normal text-xs'> 
                   {showTaskName.taskName}
               </p>
           )}
       </div>
    );
}