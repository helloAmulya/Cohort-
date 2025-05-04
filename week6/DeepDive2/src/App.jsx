import { useState } from "react";

import "./App.css";
import MemoR from "./components/MemoR";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <MemoR /> */}
      <div>
        {/* <button onClick={() => setCount(count + 1)}>Count is {count}</button> */}
      </div>
    </>
  );
}

export default App;
