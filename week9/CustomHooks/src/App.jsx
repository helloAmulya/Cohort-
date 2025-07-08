import { useState, Component, useEffect } from "react";
import axios from "axios";
import "./App.css";
import useTodos from "./hooks/useTodos";
import useIsOnline from "./hooks/useIsOnline";
import useMousePointer from "./hooks/useMousePointer";
import useTimer from "./hooks/useTimer";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [render, setRender] = useState(true);

  const { todos, loading } = useTodos(5);
  const checkStatus = useIsOnline();
  const mousePosition = useMousePointer();

  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, 500);

  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount((c) => c + 1);
  }, 1000);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRender(false);
  //     // setRender(r=>!r) (it does the reverse, like unmount then mount)
  //   }, 1000);
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-black/90 w-full h-screen text-white flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold mb-4">Custom hooks demo</h3>
        {/* <MyComponent /> */}
        {/* <MyNewComponent/> */}
        {/* {render ? <MyComponent /> : <div></div>} */}

        {/* todos */}
        <div>
          {todos.map((todo) => (
            <Track todo={todo} />
          ))}
        </div>

        {/* online status */}
        <div>
          user is :{" "}
          {checkStatus ? (
            <span className="text-green-500">Online</span>
          ) : (
            <span className="text-red-400">Online</span>
          )}
        </div>

        {/* mouse location */}
        <div>
          Your mouse position is {mousePosition.x}, {mousePosition.y}
        </div>

        {/* increment count */}
        <div>
          This is incrementing count:{" "}
          <span className="text-green-500">{count}</span>{" "}
        </div>

        {/* debounce input */}

        Debounced value: {debouncedValue}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search...."
        />
      </div>
    </>
  );
}

function MyComponent() {
  // const [count, setCount] = useState(0);
  // const increment = () => {
  //   setCount(count + 1);
  // };
  // return (
  //   <div className="flex flex-row justify-center items-center gap-4">
  //     <p className="text-xl ">{count}</p>
  //     <div className="bg-white h-10 w-[2px]"></div>
  //     <button
  //       className="px-4 py-2 rounded-full bg-red-600"
  //       onClick={increment}
  //     >
  //       Increment
  //     </button>
  //   </div>
  // );

  useEffect(() => {
    console.log("Component Mounted");
    return () => {
      console.log("Unmounted");
    };
  }, []);
  return <div>From inside my component</div>;
}
// no more used these components
// class MyNewComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }
//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 });
//   };
//   render() {
//     return (
//       <div className="flex flex-row justify-center items-center gap-4">
//         <p className="text-xl ">{this.state.count}</p>
//         <button
//           onClick={this.incrementCount}
//           className="px-4 py-2 rounded-full bg-green-600"
//         >
//           Increment
//         </button>
//       </div>
//     );
//   }
// }

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default App;
