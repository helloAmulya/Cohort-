// import React from "react";

// export function CardWrapper({ innerComponent }) {
//   return (
//     <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>
//       {innerComponent}
//     </div>
//   );
// }

// export function TextComponent() {
//   return (
//     <div>
//       <h1>Hedsdfssdi</h1>
//     </div>
//   );
// }

// // export default CardWrapper;

import React from "react";

function CardWrapper({ children }) {
    console.log(children)

  return (
    <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>
      {children}
    </div>
  );
}

export default CardWrapper;
