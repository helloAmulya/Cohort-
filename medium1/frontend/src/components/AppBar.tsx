import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { Search } from 'lucide-react';
import { Blogs } from '../pages/Blogs';

export const AppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {

        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };


    const SearchBlogs = () => {
    }// to add 

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
                         focus:ring-1 focus:ring-gray-200 outline-none transition w-40 md:w-60"
                            onClick={SearchBlogs}
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
                        {isLoggedIn ? (
                            <li className="hover:text-gray-900 cursor-pointer transition" onClick={handleLogout}>
                                Logout
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/signin"
                                        className="hover:text-gray-900 transition"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="hover:text-gray-900 transition"
                                    >
                                        Signup
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 shadow-sm transition cursor-pointer"
                                onClick={() => navigate("/publish")}
                            >
                                Write
                            </button>
                            <Avatar name="Amulya" size="big" />
                        </>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

