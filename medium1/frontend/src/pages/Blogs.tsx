import React from 'react'
import { BlogCard } from '../components/BlogCard'
import { AppBar } from '../components/AppBar'
import { useBlogs } from '../hooks';

export const Blogs = () => {

  const { loading, blogs } = useBlogs();


  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 ">
        <div className="flex animate-pulse space-x-4">
          <div className="size-10 rounded-full bg-gray-200"></div>
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-200"></div>
              <div className="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <div className='mb-4'><AppBar /></div>

      <div className='flex justify-center'>

        <div className='flex justify-center max-w-xl flex-col'>
          {blogs.map(blog => <BlogCard
            authorName={blog.author.username || "daddy"}
            title={blog.title}
            content={blog.content}
            id={blog.id}
            publishedDate={`${new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}`}
          />)}

        </div>
      </div>
    </div>
  )
}
