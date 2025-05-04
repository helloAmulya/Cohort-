import { useState, useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered.
// Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(1); // initial render is 1

  renderCount.current += 1; // increment on every render

  const handleReRender = () => {
    setCount(count + 1); // just to force re-render
  };

  return (
    <div>
      <p>This component has rendered {renderCount.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
