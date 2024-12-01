import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

    const navigate=useNavigate();

    const handleSumbit=async(e)=>{
        e.preventDefault();
        setError("")
        setSuccess("")
        try {
            const response=await axios.post("http://localhost:8000/api/v1/user/loginuser",{
                email,
                password
            },{withCredentials:true});

            if(response.status==200){
                setEmail("");setPassword("");
                setSuccess("User Logged in successfully")
                console.log(response.data)
                navigate("/dashboard")
            }
            else{
                setError("User Login Failed")
            }
        } catch (error) {
            console.log(error);
            setError("User Login Failed")
        }

        setTimeout(()=>{
            setError("")
            setSuccess("")
        },3000)
    }

    const checkForCookie=async()=>{
        setError("")
        setSuccess("")
        try {
            const response=await axios.get("http://localhost:8000/api/v1/user/checkForVerifyJWT",{withCredentials: true})
            if(response.status==200){
                setSuccess("Cookie")
            }
            else{
                setError("No cookie")
            }
        } catch (error) {
            console.log(error)
            setError("No cookie")
        }
        setTimeout(()=>{
            setError("")
            setSuccess("")
        },3000)
    }

    const logout=async()=>{
        setError("")
        setSuccess("")
        try {
            const response=await axios.post("http://localhost:8000/api/v1/user/logoutuser",{},{ withCredentials: true })
            if(response.status==200){
                setSuccess("Logged out successfully")
            }
            else{
                setError("Logout Failed")
            }
        } catch (error) {
            console.log(error)
            setError("Logout failed")
        }
        setTimeout(()=>{
            setError("")
            setSuccess("")
        },3000)
    }

    return (
        <div className='flex justify-center pt-10'>
            <div className="bg-white w-1/3  p-8 rounded-lg shadow-lg" style={{
            background: "linear-gradient(to right, #F0C1E1, #FDDBBB, #FFF9BF)"
        }}>
            {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">Error: </span> {error}
                    </div>
                    )}
    
            {success && (
                    <div className="text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <span className="font-medium">Success: </span> {success}
                    </div>
                    )}
            <div className="relative flex flex-col">
                <h2 className="block text-2xl font-medium text-slate-800 ">
                    Login User
                </h2>
                <br></br>
    
                <form className="w-full" onSubmit={handleSumbit}>
    
                    {/* email */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
    
                    {/* Password */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
    
                    <div className='flex justify-center'><button type="submit" className="pl-10 pr-10 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button></div>
                </form>
    
                <br></br>
                <h1 className='text-xl font-semibold text-center mb-2'>New user?</h1>
                {/* <button type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Login</button> */}
                <div className='flex justify-center'><button onClick={()=>{navigate("/")}} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button></div><br></br>
                <div className='flex justify-center'><button onClick={checkForCookie} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Check for Cookie</button></div>
                <div className='flex justify-center'><button onClick={logout} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button></div>
                <div className='flex justify-center'><button onClick={()=>{navigate("/dashboard")}} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Stay logged out</button></div>

            </div>
            </div>
        </div>
      )
}

export default Login