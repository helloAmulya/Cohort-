import React, { useEffect, useState } from "react";

function AceKeyboard() {
  const [alpha, setAlpha] = useState([]);

  function renderAlpha() {
    let ch = "A";
    const arr = [];
    for (let i = 0; i < 26; i++) {
      arr[i] = String.fromCharCode(ch.charCodeAt(0) + i);
      console.log(arr[i]);
    }
    console.log(arr);
    setAlpha(arr);
  }
  useEffect(() => {
    renderAlpha();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-[#0F1012] ">
      <div className="bg-[#0B0A0E] max-w-2xl flex items-center flex-col" >
        {alpha.map((ch, i) => {
          return (
            <button
              className="shadow-b-white h-24 w-24 rounded-xl border-[0.5px] border-t-2 border-[#545457] border-t-[#525255] text-center text-xl text-white shadow-xl/80 shadow-[#9B9B9C] transition duration-75 ease-in hover:scale-95 hover:shadow-none focus:outline-none"
              key={i}
            >
              {ch}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AceKeyboard;
