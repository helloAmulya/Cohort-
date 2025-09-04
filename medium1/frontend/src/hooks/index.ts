import axios from "axios";
import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`)
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
            })
    }, [])


    return {
        loading,
        blogs
    }
}