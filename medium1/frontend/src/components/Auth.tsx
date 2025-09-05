
import type { SignupSchema } from '@daddyamulya/medium-common'
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'



export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInputs] = useState<SignupSchema>({
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
      // const jwt = (await response).data;
      console.log("Response data:", response.data);
      const jwt = response.data.token; 
      localStorage.setItem("token", jwt);

      navigate("/blogs")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full max-w-md px-6">

        {/* heading */}
        <div className="flex flex-col items-center text-center mb-6">
          <h3 className="text-4xl font-bold">
            {type === "signup" ? "Create an Account" : "Welcome Back"}
          </h3>
          <p className="text-neutral-500 text-md mt-2">
            {type === "signup"
              ? <>Already have an account? <Link to="/signin" className="text-blue-500 ml-1">Signin</Link></>
              : <>Don’t have an account? <Link to="/signup" className="text-blue-500 ml-1">Signup</Link></>
            }
          </p>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-4 w-full">
          {type === "signup" && (
            <LabeledInput
              label="Username"
              placeholder="username"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, username: e.target.value }))
              }
            />
          )}

          <LabeledInput
            label="Email"
            type="email"
            placeholder="email"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, email: e.target.value }))
            }
          />
          <LabeledInput
            label="Password"
            type="password"
            placeholder="password"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
          />
        </div>


        <button onClick={sendRequest} type="button" className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 '>{type === 'signup' ? "Sign Up" : "Sign In"}</button>
      </div>
    </div>
  )
}

interface LabelInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({ label, placeholder, onChange, type }: LabelInputProps) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </div>
  )
}
