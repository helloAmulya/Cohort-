import { useState } from "react";

import "./App.css";
import ModalPopBox from "./components/ModalPopBox";
import Herosection from "./components/Herosection";
import AceKeyboard from "./components/AceKeyboard";


function App() {
return (
    <div className="h-screen bg-mainBG"> 
      {/* <ModalPopBox /> */}


      {/* <Herosection/> */}
      <AceKeyboard/>

    </div>
  );
}

export default App;
