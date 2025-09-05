import  { useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { BlogCard } from '../components/BlogCard'
import { useBlogs } from '../hooks'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const { blogs, loading } = useBlogs();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange); 
    return () => window.removeEventListener('storage', handleStorageChange); 
  }, []);
  const dummmyBlogs = {
    content: "kihougw ",
    title: "foihovnx", 
    username: "mufa", 
    key: 23423, 
    id: "23423", 
    publishedDate: "anytime" 

  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <AppBar />

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

        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>

          {!isLoggedIn ? (
            <div>

              <div className="space-y-6">
                <BlogCard
                  key={dummmyBlogs.id}
                  id={dummmyBlogs.id.toString()}
                  authorName={dummmyBlogs.username || "Anonymous"}
                  title={dummmyBlogs.title}
                  content={dummmyBlogs.content}
                  publishedDate={new Date(dummmyBlogs.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                />

              </div>
              <p className="text-gray-500">Dummy Blog |  <Link to="/signin"
                className="hover:text-gray-900 transition"
              >
                Login
              </Link> to see Posts</p>
            </div>

          ) : loading ? (
            <p className="text-gray-500">Fetching Latest Blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-500">No blogs yet. Be the first to write!</p>
          ) : (
            <div className="space-y-6">
              {blogs.slice(0, 5).map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id.toString()}
                  authorName={blog.author.username || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
