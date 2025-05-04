import React from "react";

function BusinessCard(props) {
  return (
    <div className=" text-white flex flex-col justify-center  mx-auto ">
      <h1 className="text-5xl font-bold ">{props.name}</h1>
      <p className="text-gray-200 mt-4 text-2xl ">{props.description}</p>

      <h2 className="text-4xl font-bold mt-4 ">Interests</h2>
      <ul className="flex flex-col gap-1 mt-3">
        <li>Ionic</li>
        <li>Open Source</li>
        <li>Web dev</li>
      </ul>
      <div className="flex flex-row gap-4 mt-2">
        <button className="bg-blue-500 px-4 py-2 rounded-md mt-4">
          Linkedin
        </button>
        <button className="bg-blue-500 px-4 py-2 rounded-md mt-4">
          Twitter
        </button>
      </div>
    </div>
  );
}

export default BusinessCard;
