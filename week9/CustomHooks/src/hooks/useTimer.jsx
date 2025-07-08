import React, { useState, useEffect } from "react";

// this is a time based hook, increments the counter every 1 second

function useTimer(fn, timeout) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      fn();
    }, timeout);

    return () => clearInterval(timer);
  }, [fn, timeout]);
  return count;
}

export default useTimer;
