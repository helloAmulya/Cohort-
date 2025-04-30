import React, { useState, useEffect } from "react";
import CreateTodo from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const json = await res.json();
        console.log(json.msg);
        fetchTodos(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.error("Failed to delete todo:", err);
      });
  };

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} onDelete={deleteTodo}/>
    </div>
  );
}

export default App;
