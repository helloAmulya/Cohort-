import React, { useState, useCallback } from "react";

// Create a counter component with increment and decrement functions.
//  Pass these functions to a child component which has buttons to perform the increment and decrement actions.
// Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  // Your code starts here
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const handleDecrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  // Your code ends here

  return (
    <div>
      <p>Count: {count}</p>
      <CounterControls
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

// prevent re-renders
const CounterControls = React.memo(({ onIncrement, onDecrement }) => {
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});

//   this will fix the react/display-name ESLint warning
CounterControls.displayName = "CounterControls";

/*
    1.memo
    Prevents re-rendering of a component if its props haven’t changed.
    Ex : const MyComponent = React.memo((props) => { ... });
    
    2.useMemo
    Caches a computed value so it’s not recalculated on every render.
    Ex : const expensiveValue = useMemo(() => compute(), [dependencies]);
    
    3.useCallback
    Caches a function so it’s not recreated on every render.
    Ex : const callback = useCallback(() => doSomething(), [dependencies]);
    
*/
