// import React from 'react'
// import { Link, useLocation, useNavigate } from 'react-router'
// import { Avatar } from './BlogCard'

// export const AppBar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     return (
//         <div className="border-b border-neutral-400 bg-white shadow-sm flex justify-between items-center px-10 py-3">

//             <div className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition"
//             >
//                 <Link to="/">Madcom</Link>
//             </div>

//             <div className=' flex-row flex justify-between items-center space-x-4'>
//                 <input type="text" placeholder='Search Blog'
//                     className='px-14 py-1.5 rounded-xl text-sm border border-neutral-300 focus:ring-0 outline-none placeholder:text-left'
//                     onSubmit={() => navigate('/signin')} />

//                 <ul className='flex flex-row space-x-2' >

//                     {location.pathname !== "/blogs" && (
//                         <li>
//                             <Link
//                                 to="/blogs"
//                                 className="cursor-pointer hover:text-gray-900"
//                             >
//                                 Hub
//                             </Link>
//                         </li>
//                     )}
//                     <li>Logout</li>
//                 </ul>

//             </div>


//             <div className="flex items-center gap-4">
//                 <button className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition">
//                     Write
//                 </button>

//                 <Avatar name="Amulya" size={"big"} />
//             </div>
//         </div>
//     )
// }



import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from './BlogCard'
import { Search } from 'lucide-react'

export const AppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="border-b border-neutral-200 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">


                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition"
                >
                    Madcom
                </Link>


                <div className="flex items-center space-x-6">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="pl-9 pr-4 py-1.5 rounded-lg text-sm border border-neutral-300 
                         focus:ring-1 focus:ring-gray-200 outline-none transition w-40 md:w-60 "

                        />
                    </div>


                    <ul className="flex items-center space-x-4 text-sm font-medium text-gray-600">
                        {location.pathname !== "/blogs" && (
                            <li>
                                <Link
                                    to="/blogs"
                                    className="hover:text-gray-900 transition"
                                >
                                    Hub
                                </Link>
                            </li>
                        )}
                        <li className="hover:text-gray-900 cursor-pointer transition">
                            Logout
                        </li>
                    </ul>
                </div>


                <div className="flex items-center gap-4">
                    <button className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 shadow-sm transition">
                        Write
                    </button>
                    <Avatar name="Amulya" size="big" />
                </div>
            </div>
        </header>
    )
}
