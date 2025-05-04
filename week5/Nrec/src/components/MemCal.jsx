import React, { useState, useEffect } from "react";

function MemCal() {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  function sumHandler() {
    setSum(parseInt(sum) + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <input type="text" onChange={(e) => setSum(e.target.value)} />
      <p> Sum is {sum}</p>
      <button onClick={sumHandler}>Counter ({count})</button>
    </div>
  );
}

export default MemCal;
