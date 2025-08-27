// pages/Signup.tsx

import React from "react";
import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="">
        <Auth type="signup" />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};

