import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Product() {

  const [products,setProducts]=useState([])
  const navigate=useNavigate()

  const getAllProducts=async()=>{
    try {
      const response=await axios.get("http://localhost:8000/api/v1/product/getAllProducts",{withCredentials:true})
      if(response.status===200){
        setProducts(response.data.products)
        // toast.success("Products fetched successfully")
      }else{
        toast.error("No products found")
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      toast.error("No products found")
    }
  }
  useEffect(()=>{getAllProducts()},[])

  const deleteProduct=async(id)=>{
    try {
      const response=await axios.delete(`http://localhost:8000/api/v1/product/deleteProduct/${id}`,{withCredentials:true})
      if(response.status===200)
      {
        toast.success("Deleted successfully")
        getAllProducts()
      }
      else
      {
        console.log(response) 
        toast.error("Deletion failed")
      }
    } catch (error) {
      console.log(error)
      toast.error("Deletion failed")
    }
  }

  return(
    <div className='flex justify-center items-center flex-wrap bg-gray-300'>
      {products.map((product)=>(
        <div key={product._id} className=' hover:cursor-pointer  relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md' onClick={()=>navigate(`/dashboard/adminDashboard/product/${product._id}`)}>
          <div style={{width:"19rem"}} className='bg-white p-1 text-center'>
          <img src={product.photo} className='m-1'></img>
          <h3 className='font-semibold'>{product.name}</h3>
          </div>
        </div>
      ))}

      <ToastContainer/>
    </div>
  );
}

export default Product