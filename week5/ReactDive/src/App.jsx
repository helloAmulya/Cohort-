import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BusinessCard from "./components/BusinessCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-black/90 w-full h-screen flex flex-col justify-center text-left">
        <BusinessCard
          name={"Amulya"}
          description={"An electronics undergrad"}
        />
      </div>
    </>
  );
}

export default App;
