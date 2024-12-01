import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useOrder } from '../context/PrevOrder'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function Order() {
  const {prevOrders,setPrevOrders}=useOrder()
  console.log(prevOrders)
  const {isLoggedIn,setIsLoggedin}=useAuth()
  const navigate=useNavigate()

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/order/showOrders',{withCredentials:true}); // Update with your API endpoint
        setPrevOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    showOrders();
  }, []);

useEffect(()=>{
    if(!isLoggedIn)
        navigate("/dashboard/")
},[])

  return (
    <div>
        {
            prevOrders.map((order)=>(
                <div key={order._id} className='flex flex-col justify-center'>
                    <div className='bg-orange-300 m-5 rounded text-black font-semibold'>
                    <div className='flex gap-4 p-2'>
                    {
                        order.products.map((product)=>(
                            <div key={product._id} className='flex flex-col'>
                            <div className='text-center'>{product.name}</div>
                                <img src={product.photo} className='bg-cover' style={{
                        width: '150px',   // Set the width of the image
                        height: '150px'}}></img>
                            </div>
                        ))
                    }
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex justify-center items-center'><div className='bg-green-400 p-1 m-1 rounded'>Status : {order.status}</div></div>
                        <div className='flex justify-center items-center'><div className='bg-blue-400 p-1 m-1 rounded'>Contact us at +919454830294</div></div>
                    </div>
                    </div>
                </div>
                </div>
            ))
        }
    </div>
  )
}

export default Order