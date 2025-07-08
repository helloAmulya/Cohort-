import React, { useEffect, useState } from "react";
import axios from "axios";

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setInterval(() => {
  //     axios.get(`http://localhost:8080/todos`).then((res) => {
  //       setTodos(res.data.todos);
  //       setLoading(false);
  //     });
  //   }, 5000);

  //   axios.get(`http://localhost:8080/todos`).then((res) => {
  //     setTodos(res.data.todos);
  //     setLoading(false);
  //   });

  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/todos`);
        setTodos(res.data.todos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();

    const autoRefresh = setInterval(fetchTodos, n * 1000);
    return () => clearInterval(autoRefresh); // this is a cleanup function to prevent the memory leaks
  }, []);

  return { todos, loading };
}

export default useTodos;
