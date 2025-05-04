import React, { useCallback, useState, useEffect, memo } from "react";

var a = 1;
function Cback() {
  const [counter, setCounter] = useState(0);
  var a = useCallback(() => {
    c;
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Counter ({counter})
      </button>
    </div>
  );
}

const Demo = memo(function (a) {
  console.log("rerender");
  return <div>hello</div>;
});
export default Cback;
