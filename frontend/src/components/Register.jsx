import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Register() {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [role,setRole]=useState(0)
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const navigate=useNavigate()
    const [adminSecretKey,setAdminSecretKey]=useState("")

    const handleSumbit=async(e)=>{
        e.preventDefault();
        setError("")
        setSuccess("")

        try {
            const calculatedRole=(adminSecretKey==="BMSCE"?1:0)
            const response=await axios.post("http://localhost:8000/api/v1/user/register",{
                username,
                email,
                phone,
                address,
                role:Number(calculatedRole),
                password
            })
            if(response.status==200){
                setUsername("");setEmail("");setPhone("");setAddress("");setRole(0);setPassword("");
                setSuccess("User registered successfully")
                navigate("/login")
            }
            else{
                console.log(response);
                setError("User registration failed")
            }
        } catch (error) {
            console.log(error);
            setError("User registeration failed")
        }
        setTimeout(()=>{
            setError("")
            setSuccess("")
        },3000);
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
                Register User
            </h2>
            <br></br>

            <form className="w-full" onSubmit={handleSumbit}>
                {/* //username */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                    <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                {/* email */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                {/* Phone Number */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                    <input type="text" id="phone"  value={phone} onChange={(e)=>setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                {/* Address */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                {/* isAdmin checkbox */}

                <div className="mb-5">
                {
                    role===1 && (<div><label className="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white">Enter the admin secret key</label>
                    <input type="text" id="text" value={adminSecretKey} onChange={(e)=>setAdminSecretKey(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>)
                }
                </div>
                <div className='flex'>
                    <input type="checkbox" name="role" id="role" checked={role===1} onChange={(e)=>setRole(e.target.checked?1:0)}/>
                    <label className="block mb-2 ml-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">Register as admin</label>
                </div>

                <div className='flex justify-center'><button type="submit" className="pl-10 pr-10 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button></div>
            </form>

            <br></br>
            <h1 className='text-xl font-semibold text-center mb-2'>Already an user?</h1>
            {/* <button type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Login</button> */}
            <div className='flex justify-center'><button onClick={()=>{navigate("/login")}} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></div>
            <br></br>
            <div className='flex justify-center'><button onClick={()=>{navigate("/dashboard")}} type="button" className="pl-10 pr-10 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Stay logged out</button></div>
        </div>
        </div>
    </div>
  )
}

export default Register