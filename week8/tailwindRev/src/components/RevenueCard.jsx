import React from "react";

function RevenueCard({ title, orderCount, orderColor, count, amount }) {
  const textColorMap = {
    red: "text-red-500",
    green: "text-green-500",
    blue: "text-[#146EB4]",
    gray: "text-gray-500",
  };
  return (
    <div className="bg-white shadow-md rounded p-2">
      <div className="flex flex-row gap-2 cursor-pointer items-center text-[#4D4D4D]">
        {title}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <div className="flex justify-between  ">
        {/* <div className="text-black font-medium text-2xl">{"₹"+amount}</div> */}
        <div className="text-black font-medium text-2xl">
          ₹{amount.toLocaleString("en-IN")}
        </div>
        {orderCount ? (
          <div
            className={`${textColorMap[orderColor]} flex flex-row underline cursor-pointer text-[16px] font-medium`}
          >
            {orderCount} Orders
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// hello

export default RevenueCard;
