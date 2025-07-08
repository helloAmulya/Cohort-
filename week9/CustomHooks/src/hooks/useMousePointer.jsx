import React, { useState, useEffect } from "react";

// to get the mouse position (this can be used at times of animations and website effects based on pointer position)

function useMousePointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}

export default useMousePointer;
