import React from "react";

function Herosection() {
  return (
    <div>
      <div className="h-64 bg-[radial-gradient(ellipse_at_top,_#21384A_0%,_#000000_100%)]">
        <div className="flex w-full flex-col items-center justify-center pt-30 selection:bg-[#67E8F9] selection:text-[#155E75]">
          <h1 className="max-w-2xl bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-center text-7xl leading-20 font-bold tracking-tight text-transparent ">
            Unleash the power of intuitive finance
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xl text-neutral-500 selection:bg-[#67E8F9] selection:text-[#155E75]">
            Say goodbye to the <span className="text-[#44cdf6]">outdated</span>{" "}
            financial tools. Every small business owner, regardless of the
            background, can now manage their{" "}
            <span className="text-[#44cdf6]">business</span>
            like a pro. Simple. Intuitive. And never boring.
          </p>

          <div className="mt-8 flex w-full max-w-96 justify-center">
            <input
              type="text"
              placeholder="Enter your email "
              className="mr-4 w-full flex-1 rounded-3xl border border-neutral-700 px-4 text-white transition duration-200 placeholder:text-neutral-400 focus:ring-1 focus:ring-[#67E8F9] focus:outline-none"
            />

            <button className="relative cursor-pointer rounded-full border border-neutral-700 px-4 py-2 text-sm text-white">
              Join The Waitlist
              <div className="-botttom-px absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
