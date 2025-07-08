import React, { useEffect, useState } from "react";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/todos`).then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  return todos;
}

export default useTodos;
