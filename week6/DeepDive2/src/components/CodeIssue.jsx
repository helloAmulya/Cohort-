// import React, { memo,useState } from "react";

// function CodeIssue() {
//   const [count, setCount] = useState(0);

//   function onClick() {
//     console.log("hfdf");
//   }
//   return (
//     <div>
//       <Child onClick={onClick} />
//       <button
//         onClick={() => {
//           setCount(count + 1);
//         }}
//       >
//         Click me {count}
//       </button>
//     </div>
//   );
// }

// const Child = memo(({onClick}) => {
//   console.log("child render");
//   return (
//     <div>
//       <button onClick={onClick}>button Clicked</button>
//     </div>
//   );
// });

// export default CodeIssue;

/******************************* */

import React, { useEffect, useState } from "react";
import axios from "axios";

function CodeIssue() {
  const [todo, setTodo] = useState(null);
  const [Id, setId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      axios(`http://localhost:8080/todo?id=${Id}`).then((response) => {
        setTodo(response.data.todo);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [Id]);

  return (
    <div>
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <button onClick={() => setId(4)}>4</button>
      <button onClick={() => setId(5)}>5</button>

      {todo && (
        <Todo key={todo.id} description={todo.description} title={todo.title} />
      )}
    </div>
  );
}

function Todo({ description, title }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
}

export default CodeIssue;

/************************ */
