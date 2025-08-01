import { useState } from "react";

import "./App.css";
import ModalPopBox from "./components/ModalPopBox";
import Herosection from "./components/Herosection";


function App() {
return (
    <div className="h-screen bg-mainBG"> 
      {/* <ModalPopBox /> */}
      <Herosection/>

    </div>
  );
}

export default App;
