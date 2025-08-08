import Todo from "./Components/Todo";
import Form from "./Components/Form";
import { useEffect, useState } from "react";
import {nanoid} from "nanoid";
import {useRef} from "react";
import FilterButton from "./Components/FilterButton";
function App(props) {
  const FILTER_MAP={
    All:()=>true,
    Active:(task)=>!task.completed,
    completed:(task)=>task.completed
  }
  const FILTER_NAME=Object.keys(FILTER_MAP);
  const[filter,setFilter]=useState("All");
  const [tasks,setTasks]=useState(props.tasks);
  const listHeadingRef=useRef(null);
  function usePrevious(value){
      const ref=useRef(null);
      useEffect(()=>{
      ref.current=value;
   });
   return ref.current;
    }
    const previousTaksLength=usePrevious(tasks.length);
    useEffect(()=>{
      if(tasks.length<previousTaksLength){
        listHeadingRef.current.focus();
      }
    });
  function addTask(name) {
const newTask={id:`todo-${nanoid()}`,name,completed:false};
setTasks([newTask,...tasks]);
  }
function changeCompleted(id){
const updateTasks=tasks.map((task)=>{
  if(id===task.id){
    return{...task,completed:!task.completed};
  }
  return(task);
})
setTasks(updateTasks);
}
function deleteTasks(id){
const remainingTasks=tasks.filter((task)=>id!==task.id);
setTasks(remainingTasks);
}
function editTasks(id,newName){
  const editedLisk=tasks.map((task)=>{
    if(id===task.id){
      return {...task,name:newName};
    }
    return(task);
  });
  setTasks(editedLisk);
}
const filterLisk=FILTER_NAME.map((name)=>
  (<FilterButton name={name}
    key={name}
    isPressed={name===filter}
    setFilter={setFilter}/>
));
  const tasksLisk =tasks.filter(FILTER_MAP[filter])
  .map((task) =>
    (<Todo id={task.id} 
      name={task.name}
       key={task.id} 
       defaultChecked={task.completed}
        changeCompleted={changeCompleted}
         deleteTasks={deleteTasks}
         editTasks={editTasks}/>))
  const sJudge=(tasksLisk.length)<=1?"task":"tasks";
  const listHeading=`${tasksLisk.length} ${sJudge} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
      {filterLisk}
      </div>
      <h2 id="list-heading" ref={listHeadingRef} tabIndex={"-1"}>{listHeading}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasksLisk}
      </ul>
    </div>
  );
}

export default App;
