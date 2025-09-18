"use client"

import axios from 'axios'
import React, { ChangeEventHandler, useState } from 'react'
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleSignUp() {
    try {
      const res = await axios.post("/api/user", { username, password });
      router.push("/"); // this REDIRECTS to '/' after post request completes
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className='h-screen flex-col items-center justify-center'>
      <div className="flex justify-center mt-10">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">
                Sign up
              </div>
            </div>
            <div className="pt-2">
              <LabeledInput onChange={(e) => setUsername(e.target.value)} placeholder="Enter your email" label="Username" />
              <LabeledInput onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" label="Password" />

              <button className='font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-300 mt-8 w-full text-white' onClick={handleSignUp}>Sign In</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}



interface LabeledInputType {
  label: string,
  placeholder: string,
  type?: string,
  onChange: ChangeEventHandler<HTMLInputElement>

}

function LabeledInput({ label, placeholder, type, onChange }: LabeledInputType) {
  return (
    <div>
      <label className="text-black font-semibold pt-4 mb-2 block text-sm">{label}</label>
      <input type={type || "text"} placeholder={placeholder} onChange={onChange} id="first_name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required />
    </div>
  )
}

