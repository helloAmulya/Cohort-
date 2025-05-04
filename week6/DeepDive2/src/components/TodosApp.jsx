import React, { useEffect, useState } from "react";

function TodosApp() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:8080/todos").then(async function (res) {
        const json = await res.json();
        // here i am recieving the whole object, so use data.todos
        setTodos(json.todos);
      });
    }, 5000);
    //every 5 seconds this will send a fetch request to the backend
  }, []);

  console.log(todos);
  return (
    <div>
      {todos.map((todo) => (
        <Todo title={todo.title} description={todo.description} key={todo.id} />
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
}

export default TodosApp;
