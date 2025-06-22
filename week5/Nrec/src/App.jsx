// import React, { Fragment } from "react";
// import "./App.css";
// import { useState } from "react";

// function App() {
//   const [title, setTitle] = useState(" ");

//   function updateTitle() {
//     setTitle(Math.random());
//   }
//   return (
//     // <>
//     //   <Header title={"Amulya"} />
//     //   <Header title={"Ratna"} />
//     // </>

//     <div>
//       <button onClick={updateTitle}>update Title 1</button>
//       <Header title={"This is one " + title} />

//       <Header title={"Ratna"} />
//       <Header title={"Sharma"} />
//       <Header title={"one"} />
//       <Header title={"Two"} />
//     </div>
//   );
// }

// // memo is used to avoid re-render
// const Header = React.memo(function Header({ title }) {
//   return <div>{title}</div>;
// });

// export default App;

/*********************** */
// import React, { useId, useState } from "react";

// let counter = 4;

// function App() {
//   const [todos, setTodo] = useState([
//     {
//       id: 1,
//       title: "todo 1",
//       description: "dnfdfbd",
//     },
//     {
//       id: 2,
//       title: "todo 2",
//       description: "nfdsfsn",
//     },
//     {
//       id: 3,
//       title: "todo 3",
//       description: "jijhh",
//     },
//   ]);

//   function addTodo() {
//     setTodo([...todos], {
//       id: 4,
//       title: Math.random(),
//       description: Math.random(),
//     });
//     const newTodos = [];
//     for (let i = 0; i < todos.length; i++) {
//       newTodos.push(todos[i]);
//     }

//     newTodos.push({
//       id: counter++,
//       title: Math.random(),
//       description: Math.random(),
//     });
//     setTodo(newTodos);
//   }

//   return (
//     <div>
//       <button onClick={addTodo}></button>
//       {todos.map((todo) => (
//         <Todo title={todo.title} description={todo.description} key={todo.id} />
//       ))}
//     </div>
//   );
// }

// function Todo({ title, description }) {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <h3>{description}</h3>
//     </div>
//   );
// }

// export default App;
/*********************** */

// import React from "react";
// // import "./App.css";

// // import { CardWrapper, TextComponent } from "./components/CardWrapper";
// import CardWrapper from "./components/CardWrapper";

// function App() {
//   return (
//     <div>
//       <CardWrapper>Hienndunnd
//         <p>nfndnfdfndd</p>
//       </CardWrapper>

//       {/* <CardWrapper innerComponent={<TextComponent />} /> */}
//       {/* <CardWrapper innerComponent={<TextComponent />} /> */}
//     </div>
//   );
// }

// function CardWrapper({ innerComponent }) {
//   return (
//     <div className="wrapper border-black text-black bg-white rounded-md">
//       {innerComponent}
//     </div>
//   );
// }

// function TextComponent() {
//   return (
//     <div>
//       <h1>Hedi</h1>
//     </div>
//   );
// }

// export default App;

import React from "react";
import MemoR from "./components/MemoR";
import TodosApp from "./components/TodosApp";
import CodeIssue from "./components/CodeIssue";
import MemCal from "./components/MemCal";

function App() {
  return (
    <div>
      {/* <MemoR /> */}
      {/* <TodosApp /> */}
      <CodeIssue/>
      {/* <MemCal/> */}
    </div>
  );
}

export default App;
