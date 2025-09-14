"use client"

import React from 'react'

export const Button = () => {
    function handler() {
        console.log("clicked ")
    }
    // we can define the function in other file also and call it as per the requirement
    return (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        // onClick={handler}
        >
            Click me
        </button>
    )
}
