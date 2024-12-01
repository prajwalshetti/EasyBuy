import React from 'react'
import { useAuth } from '../context/auth'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Profile() {
  const {isLoggedIn,setIsLoggedIn}=useAuth()
  const {user,setUser}=useAuth()
  console.log(user)
  const navigate=useNavigate()


  const handleLogout=async()=>{
    try {
        const response=await axios.post("http://localhost:8000/api/v1/user/logoutuser",{},{ withCredentials: true })
        if(response.status==200){
            setUser(null)
            setIsLoggedIn(false)
            navigate("/dashboard")
        }
    } catch (error) {
        console.log(error)
    }
}

  if (!user) {
    return (
        <div className="m-10">
            <h1 className="text-xl font-bold text-gray-700">Loading...</h1>
            <p className="text-gray-500">Please wait while we load your profile.</p>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
              <div className="h-6 bg-gray-300 rounded mt-2"></div>
            </div>
        </div>
    );
}

  return (
    <div className="bg-gray-300 m-20 max-w-sm scale-100 hover:scale-110  transform transition-transform duration-200 ">
      <div className="rounded-lg border bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 hover:bg-gradient-to-br px-4 pt-8 pb-10 shadow-lg transform transition-transform duration-200">
      <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
      </h1>


        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Email</span>
            <span className="ml-auto">{user.email}</span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Phone-number</span>
            <span className="ml-auto">{user.phone}</span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Address</span>
            <span className="ml-auto">{user.address}</span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Role</span>
            <span className="ml-auto">{user.role===1?"Admin":"Customer"}</span>
          </li>
          <div className='flex justify-center'>
            <button type="button" onClick={handleLogout} className="mt-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
          </div>
        </ul>
      </div>
  </div>
  )
}

export default Profile