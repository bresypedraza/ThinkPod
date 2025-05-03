import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { FcEmptyTrash } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";

/**
 * A To-Do list window that allows user to add tasks, delete tasks, and edit tasks. 
 * This function puts all the functions in this class together to form a todo list component. 
 * @param {string[]} props.showTasks - Array of tasks in To-Do list to display.
 * @param {Function} props.setTasks - A function that updates the task's  list.
 * @param {boolean[]} props.showCheckMark - Array of booleans that indicates a checkbox's state.
 * @param {Function} props.setCheckMark - A function that updates the array of checkbox's state.
 * @returns {JSX.Element} The To-Do list window
 */
export function ToDoList({showTasks, setTasks, showCheckMark, setCheckMark}){

    // A state that keeps track whether todo list window should slide or not
    const [shouldSlide, setShouldSlide] = useState(false);

    // Makes sure widow slides when it appears
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
                    <GiNotebook className='notebook-icon w-8 h-6 text-yellow-500'/>
                </div>
                <SearchBarAndButton setTasks={setTasks} setCheckMark={setCheckMark}/>
                <div className='flex flex-col'>
                    {showTasks.map((task, index) =>  <TaskPlanBox showTasks={showTasks} setTasks={setTasks} showCheckMark={showCheckMark}  setCheckMark={setCheckMark} index={index} key={index}/> )}
                </div>
            </div>
        </div>
    );
}

/**
 * Renders the search bar and "Add" button for the To-Do list window.
 *
 * This component manages user input for new tasks and handles the logic
 * for updating the task list and corresponding checkbox state. 
 * @param {Function} props.setTasks - A function that updates the task's  list.
 * @param {Function} props.setCheckMark - A function that updates the array of checkbox's state.
 * @returns {JSX.Element} The search bar and add button
 */
function SearchBarAndButton({setTasks, setCheckMark}){
    // Search term state. Keeps track of what the user inputs
    const [searchTerm, setSearchTerm] = useState('');

    // Updates what the user inputs
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

    // Updates checkmark state
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

/**
 * Renders the Task Box that is shown on the To-Do list window when user adds a task,
 * 
 * This component displays the list of tasks, handles task deletion logic and displays checkmark when
 * user clicks checkbox.
 * @param {string[]} props.showTasks - Array of tasks in To-Do list to display.
 * @param {Function} props.setTasks - A function that updates the task's ' list.
 * @param {boolean[]} props.showCheckMark - Array of booleans that indicates a checkbox's state.
 * @param {Function} props.setCheckMark - A function that updates the array of checkbox's state.
 * @param {Int} props.setCheckMark - An index to assigned to each task box.
 * @returns {JSX.Element} A task box
 */
function TaskPlanBox({showTasks, setTasks, showCheckMark, setCheckMark, index}){
    const[showIsEditing, setIsEditing]=useState(false);

    //Updates the checkbox's state and makes sure that the checkmark is displayed in the right taskbox. 
    const handleIsChecked = () => {
        const checkState = showCheckMark.map((checkBox, idx) => {
            if(idx==index) {
                return !checkBox;
            }else{
                return checkBox
            }
    });
         setCheckMark(checkState);
    };

    // Deletes the selected task and updates the checkbox state accordingly.
    // The checkbox state array must be updated because the deleted taks no longer exist.
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

/**
 * This function creates an editable task name. 
 * 
 * @param {string[]} props.taskName - The task name that is displayed in the task box.
 * @param {string[]} props.showTasks - Array of tasks in To-Do list to display.
 * @param {Function} props.setTasks - A function that updates tasks' list.
 * @param {boolean} props.showCheckMark - Array of booleans that indicates a checkbox's state.
 * @param {Function} props.setCheckMark - A function that updates the array of checkbox's state.
 * @param {boolean} props.setTasks - A function that updates the task's list.
 * @returns {JSX.Element} An input when user clicks edit icon or a normal text when user adds a task.
 */
function HandleInlineEdit({taskName, showTasks, setTasks, showIsEditing, setIsEditing, index}){
    // Editing state is set to false when user clicks outside of the input.
    const handleBlur = () =>{
       return setIsEditing(false);
    }

    // Editing state is set to true when user clicks enter.
    const handleEnterKey = (e)=>{
        if (e.key === 'Enter'){
            return setIsEditing(false);
        }
    }

    // Updates task's list after a specific task name is updated.
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