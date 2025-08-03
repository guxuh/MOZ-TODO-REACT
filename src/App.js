import Todo from "./Components/Todo";
import Form from "./Components/Form";
import { useState } from "react";
import {nanoid} from "nanoid";
import FilterButton from "./Components/FilterButton";
function App(props) {
  const [tasks,setTasks]=useState(props.tasks);
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
  const tasksLisk =tasks.map((task) =>
    (<Todo id={task.id} name={task.name} key={task.id} defaultChecked={task.completed} changeCompleted={changeCompleted} deleteTasks={deleteTasks}/>))
  const sJudge=(tasksLisk.length)<=1?"task":"tasks";
  const listHeading=`${tasksLisk.length} ${sJudge} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{listHeading}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasksLisk}
      </ul>
    </div>
  );
}

export default App;
