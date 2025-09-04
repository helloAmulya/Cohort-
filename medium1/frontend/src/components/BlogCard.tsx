import React from 'react'

interface BlogCardProps {
    authorName: string
    title: string
    content: string
    publishedDate: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-5 mb-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
                <Avatar name={authorName}  />
                <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{authorName}</div>
                    <div className="text-xs text-gray-500">{publishedDate}</div>
                </div>
            </div>


            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>


            <p className="text-gray-700 text-sm mb-3 break-words" >
                {content.substring(0, 100) + "..."}
                {/* this is to show minimal content */}
            </p>


            <div className="text-xs text-gray-500">
                {`${Math.ceil(content.length / 100)} min read`}
                {/* the above is to calculate the time to read the blog based on the length */}
            </div>
        </div>
    )
}


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`font-medium text-gray-700 ${size === "small" ? "text-xs" : "text-md"}`}>{name[0].toUpperCase()}</span>
        </div>
    )
}

