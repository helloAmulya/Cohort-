import React from 'react'

export const Signup = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-4  w-full '>
            <h3 className='text-neutral-300 text-3xl'>Signup</h3>
            <input type="text" placeholder='Enter your email'
                className='text-white placeholder:text-neutral-400 border border-neutral-600 px-3 py-2 rounded-2xl' />
            <input type="password" placeholder='Enter your password'
                className='text-white placeholder:text-neutral-400 border border-neutral-600 px-3 py-2 rounded-2xl' />
            <button className='text-white text-sm border border-neutral-600 px-3 py-2 rounded-2xl'>create account</button>
        </div>
    )
}
