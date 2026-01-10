import axios from 'axios'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AxiosInstance } from '../axios/axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserDetail } from '../Store/Slices/user.slice'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Both field required")
    }
    setLoading(true)
    try {
      const response = await AxiosInstance.post("/auth/signup", {email, password })
      dispatch(setUserDetail(response.data))
      setLoading(false)
      toast.success("Welcome")
      navigate("/")

    } catch (error) {
      console.log("error in frontend SignUp", error)
      toast.error("Some error occured")
      setLoading(false)
    }


  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-black ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">SignUp</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSignUp}
          className=" cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          SignUp
        </button>

         <p onClick={()=>{navigate("/login")}} className='text-blue-600 underline mt-2 cursor-pointer'>Already have an account</p>
      </div>
    </div>
  )
}

export default SignUp