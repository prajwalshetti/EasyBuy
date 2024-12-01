import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ManageOrder() {

  const [orders,setOrders]=useState([])
  const [status,setStatus]=useState({})

  const changeStatus=async(status,id)=>{
    try {
      const response=await axios.post(`http://localhost:8000/api/v1/order/changeStatus/${id}`,{status},{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/order/getAllOrders',{withCredentials:true}); // Update with your API endpoint
        if(response.status===200){
          console.log(response.data)
          setOrders(response.data)
          const initialStatus = response.data.reduce((acc, order) => {
            acc[order._id] = order.status;
            return acc;
          }, {});
  
          setStatus(initialStatus);
        }
        else{
          console.log(response)
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    showOrders();
  }, []);

  return (
    <div>
        {
            orders.map((order)=>(
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
                        <div className='flex justify-center items-center'><div className='bg-red-400 p-1 m-1 rounded'>{order.buyer.username}</div></div>
                        <div className='flex'>
                        <select value={status[order._id]} onChange={(e)=>{setStatus({...status,[order._id]:e.target.value})}} className='bg-green-100 p-1 m-1 rounded'>
                          <option value="" disabled>Select an option</option>
                          <option value="Processing">Processing</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <div className='flex justify-center items-center'><button className='bg-green-300 p-1 m-1 rounded hover:bg-green-500 hover:text-white transition-all ease-in-out' onClick={()=>{changeStatus(status[order._id],order._id)}}>Save</button></div>
                        </div>
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

export default ManageOrder