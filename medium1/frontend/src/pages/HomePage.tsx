import React from 'react'
import { AppBar } from '../components/AppBar'
import { BlogCard } from '../components/BlogCard'
import { useBlogs } from '../hooks'

export const HomePage = () => {
  const { blogs, loading } = useBlogs();

  return (
    <div>
      <AppBar />

      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Welcome to <span className="text-gray-700">Madcom</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover ideas, read stories, and share your own thoughts with the world.
          </p>
        </div>
      </section>

      {/* Blogs Feed */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>

        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet. Be the first to write!</p>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.username || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
