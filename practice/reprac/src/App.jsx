import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ModalPopBox from "./components/ModalPopBox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ModalPopBox />
    </div>
  );
}

export default App;
