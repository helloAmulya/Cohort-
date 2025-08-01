import { useState } from "react";

import "./App.css";
import ModalPopBox from "./components/ModalPopBox";
import Herosection from "./components/Herosection";
import AceKeyboard from "./components/AceKeyboard";

function App() {
  return (
    <div className="bg-mainBG h-screen">
      {/* <ModalPopBox /> */}

      <Herosection />
      <div className="mt-96 ">

      <AceKeyboard />
      </div>
    </div>
  );
}

export default App;
