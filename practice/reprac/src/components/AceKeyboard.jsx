import React, { useEffect, useState } from "react";

function AceKeyboard() {
  const [alpha, setAlpha] = useState([]);

  //   this code i figured out myself, looks easy but is not
  //   yes doing dsa helps sometimes ( recalling patterns)
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
    <div className="flex h-56 items-center justify-center bg-[#0F1012] p-4">
      <div className="item-center flex max-w-3xl flex-wrap justify-center gap-2 bg-[#0B0A0E]">
        {alpha.map((ch, i) => {
          return (
            <button
              className="shadow-b-white h-16 w-16 rounded-xl border-[0.5px] border-t-2 border-[#545457] border-t-[#525255] text-center text-xl text-white shadow-lg/70 shadow-[#e9e9e9] ease-in hover:scale-95 hover:shadow-none focus:outline-none"
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
