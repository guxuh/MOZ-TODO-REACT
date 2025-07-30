import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";
function App(props) {
  const tasksLisk = props.tasks.map((task) =>
    (<Todo id={task.id} name={task.name} key={task.id} defaultChecked={task.completed} />))
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasksLisk}
      </ul>
    </div>
  );
}

export default App;
