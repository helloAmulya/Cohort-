import React, { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function addTodo() {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: desc,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo Added");
      })
      .catch((err) => {
        console.error("Failed to add todo:", err);
      });
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-20 bg-transparent rounded-xl shadow-md space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
        onClick={addTodo}
      >
        Add Todo
      </button>
    </div>
  );
}

export default CreateTodo;
