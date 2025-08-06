import React, { useEffect } from "react";
import {useState} from "react";
import {useRef} from"react";

export default function Todo(props) {
  const editFieldRef=useRef(null);
  const editButtonRef=useRef(null);
  useEffect(()=>{
  if(isEditing){
    editFieldRef.current.focus();
  }
else{
  editButtonRef.current.focus();
}});
const [newName,setNewName]=useState("");
  const [isEditing,setEditing]=useState(false);
function handleChange(e){
setNewName(e.target.value);
}
function handleSubmit(e){
  e.preventDefault();
  props.editTasks(props.id,newName);
  setNewName("");
  setEditing(false);
}
  const editingTemplate = (
  <form className="stack-small" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      <input id={props.id} className="todo-text" type="text" onChange={handleChange} ref={editFieldRef}/>
    </div>
    <div className="btn-group">
      <button type="button" className="btn todo-cancel" onClick={()=>setEditing(false)}>
        Cancel
        <span className="visually-hidden">renaming {props.name}</span>
      </button>
      <button type="submit" className="btn btn__primary todo-edit">
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
  </form>
);
const viewTemplate = (
  <div className="stack-small">
    <div className="c-cb">
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.defaultChecked}
        onChange={() => props.changeCompleted(props.id)}
      />
      <label className="todo-label" htmlFor={props.id}>
        {props.name}
      </label>
    </div>
    <div className="btn-group">
      <button type="button" className="btn" onClick={()=>setEditing(true)} ref={editButtonRef}>
        Edit <span className="visually-hidden">{props.name}</span>
      </button>
      <button
        type="button"
        className="btn btn__danger"
        onClick={() => props.deleteTask(props.id)}>
        Delete <span className="visually-hidden">{props.name}</span>
      </button>
    </div>
  </div>
);

  return (
    <li className="todo stack-small">
      {isEditing?editingTemplate:viewTemplate}
    </li>
  );
}