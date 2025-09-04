import { useState } from 'react'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { Blog } from './pages/Blog.tsx'
import { Blogs } from './pages/Blogs.tsx'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
