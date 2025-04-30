import React from "react";
import { CheckCircle, XCircle, MoreVertical } from "lucide-react";

export function Todos({ todos, onDelete }) {
  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex justify-between items-start bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {todo.title}
            </h1>
            <p className="text-gray-600">{todo.description}</p>
            <div className="mt-1 text-sm">
              {todo.completed ? (
                <span className="flex items-center text-green-600 font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </span>
              ) : (
                <span className="flex items-center text-red-500 font-medium">
                  <XCircle className="h-4 w-4 mr-1" />
                  Not Completed
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-blue-500 text-sm font-medium hover:underline"
          >
              Mark as done
            </button>
            <div className="relative group">
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>

              {/* Dropdown - shown on hover */}
              <div className="absolute right-0 z-10 mt-2 w-24 bg-white border rounded shadow-lg hidden group-hover:block  ">
                <button
                  onClick={() => onDelete(todo._id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
