
import React from 'react'
import { Avatar } from './BlogCard'

export const AppBar = () => {
    return (
        <div className="border-b border-neutral-400 bg-white shadow-sm flex justify-between items-center px-10 py-3">

            <div className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition">
                Madcom
            </div>


            <div className="flex items-center gap-4">
                <button className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition">
                    Write
                </button>

                <Avatar name="Amulya" size={"big"} />
                {/* <Avatar name="Amulya"  /> */}
            </div>
        </div>
    )
}
