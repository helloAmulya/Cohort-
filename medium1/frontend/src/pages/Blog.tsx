
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { Footer } from "../components/Footer";




export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  const publishedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex animate-pulse space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-3 rounded bg-gray-200"></div>
                <div className="col-span-1 h-3 rounded bg-gray-200"></div>
              </div>
              <div className="h-3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 font-medium">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />

      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {blog.title}
              </h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                {publishedDate}
              </p>
              <article className="mt-6 prose prose-lg max-w-none text-gray-800">
                {blog.content}
              </article>
            </div>

            <div className="md:col-span-4 pt-8 md:pt-0 md:pl-8 md:border-l border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Author
              </h2>
              <div className="flex items-center">
                <Avatar
                  size="big"
                  name={blog.author.username || "Anonymous"}
                />
                <div className="ml-4">
                  <div className="text-xl font-bold text-gray-900">
                    {blog.author.username || "Anonymous"}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Random catch phrase about the author's ability to grab
                    attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};