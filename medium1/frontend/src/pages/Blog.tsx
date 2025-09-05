import React from "react";
import { useBlog } from "../hooks";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { useParams } from "react-router-dom";
import { format } from "date-fns"

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  const publishedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Blog not found.</p>
      </div>
    );
  }

  return (
    <div>
      <AppBar />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-6 md:px-10 w-full max-w-screen-xl pt-12 gap-8">

          <div className="col-span-12 md:col-span-8">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {blog.title}
            </h1>

            <p className="text-slate-500 pt-2 text-sm md:text-base">
              {publishedDate}
            </p>
            <div className="pt-6 prose prose-lg max-w-none">
              {blog.content}
            </div>
          </div>


          <div className="col-span-12 md:col-span-4 border-t md:border-t-0 md:border-l md:pl-6 pt-6 md:pt-0">
            <h2 className="text-slate-600 text-lg font-medium mb-4">
              Author
            </h2>
            <div className="flex items-start">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar
                  size="big"
                  name={blog.author.username || "Anonymous"}
                />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.username || "Anonymous"}
                </div>
                <p className="pt-2 text-slate-500 text-sm">
                  Random catch phrase about the author's ability to grab
                  attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
