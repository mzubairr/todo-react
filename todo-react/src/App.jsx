import { useState } from "react";
import "./App.css";
import "./Media.css";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState("All");

  const addTodo = (e) => {
    e.preventDefault();
    if (title && description) {
      setTodo([
        ...todo,
        { title, description, isCompleted: false, id: Date.now() },
      ]);
      setTitle("");
      setDescription("");
      Swal.fire({
        title: "Task Save!",
        icon: "success",
        customClass: {
          confirmButton: "custom-button",
          popup: "custom-swal",
        },
      });
    }
  };

  const deleteTodo = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const editTodo = (index) => {
    const updateTitle = prompt("Update your task title ");
    const updateDescription = prompt("Update your task description ");
    if (updateTitle || updateDescription) {
      setTodo(
        todo.map((task, i) =>
          i === index
            ? {
                ...task,
                title: updateTitle || task.title,
                description: updateDescription || task.description,
              }
            : task
        )
      );
    }
  };

  const toggleComplete = (id) => {
    setTodo(
      todo.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterTodos = todo.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.isCompleted;
    if (filter === "Completed") return task.isCompleted;
    return true;
  });

  return (
    <>
      <main>
        <Navbar />
        {/* Get input value */}
        <div id="todos">
          <form onSubmit={addTodo}>
            <div className="input">
              <div>
                <label htmlFor="titleField">Title</label>
                <input
                  id="titleField"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="What's the task title ?"
                />
              </div>
              <div>
                <label htmlFor="descField">Description</label>
                <input
                  id="descField"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="What's the task description?"
                />
              </div>
              <button className="addtask">Add</button>
            </div>
          </form>
        </div>
        <div className="separteline"></div>
        <div className="filterSec">
          <p className="filterText">Filter</p>
          <select
            name="filter"
            id="filterOptions"
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <TodoList
          todoArray={filterTodos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      </main>
    </>
  );
}

export default App;
