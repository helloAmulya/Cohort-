// pages/Signup.tsx

import React from "react";
import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="">
        <Auth type="signup" />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};

// import React from "react";
// import { Quote } from "../components/Quote";

// export const Signup = () => {
//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <div className="flex-1 flex items-center justify-center">
//         other component
//       </div>
//       <div className="flex-1">
//         <Quote />
//       </div>
//     </div>
//   );
// };
