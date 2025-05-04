import React, { useState, memo } from "react";

function MemoR() {
  const [count, setCount] = useState(0);

  function inputFunction() {
    console.log("Hwmen");
  }

  return (
    <div>
      <ButtonComponent inputFunction={inputFunction} />
      <button onClick={() => setCount(count + 1)}>Clickc me {count}</button>
    </div>
  );
}
const ButtonComponent = memo(() => {
  console.log("child render");
  return (
    <div>
      <button>Button Clicked</button>
    </div>
  );
});
export default MemoR;
