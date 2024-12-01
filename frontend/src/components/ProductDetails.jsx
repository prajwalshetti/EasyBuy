import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/auth';

function ProductDetails() {
  const {id}=useParams()
  const [product,setProduct]=useState(null)
  const navigate=useNavigate()
  const [similarProducts,setSimilarProducts]=useState([])
  const {cart,setCart}=useCart()
  const {isLoggedIn,setIsLoggedIn}=useAuth()

  const getSingleProduct=async()=>{
    try {
        const response=await axios.get(`http://localhost:8000/api/v1/product/getSingleProduct/${id}`,{withCredentials:true})
        if(response.status===200){
            console.log(response.data)
            setProduct(response.data)       
        }else{
            console.log("Failed to fetch the product")
        }
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{getSingleProduct()},[])

const getSimilarProducts=async()=>{
  try {
    const response=await axios.get(`http://localhost:8000/api/v1/product/getSimilarProducts/${id}`)
    if(response.status===200){
      setSimilarProducts(response.data)
    }else{
      console.log("No similar products")
    }
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{getSimilarProducts()},[])

  return (
    <div className='flex justify-around items-center p-5 bg-gray-300'>
{
    product?      (
<div>
<section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-5 mx-auto">
    <div className="mx-auto flex flex-wrap">
<img alt="ecommerce" className='w-1/2 h-1/2 bg-white p-1 text-center' src={product.photo}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.name}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>

        <p className="leading-relaxed">{product.description}</p>
        
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
        
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">{product.price} Rs.</span>
          <button type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2" onClick={()=>{
              if(!isLoggedIn){navigate("/login");return;}
              setCart([product,...cart])
              toast.success("Added to cart successfully")
            }}>Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</section>
      
      <div className='flex flex-col text-2xl mt-10 bg-white'>
        <h2 className='font-semibold pl-5 pt-2'>Similar Products</h2>
        <div className='flex'>
        {similarProducts.map((product)=>(
        <div key={product._id} className='bg-orange-200 hover:cursor-pointer  relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md' onClick={()=>{navigate(`/dashboard/productDetails/${product._id}`)}}>
          <div style={{width:"19rem"}} className=' p-1 text-center'>
          <img src={product.photo} className='m-1 p-1'></img>
          <h3 className='font-semibold'>{product.name}</h3>
          <h4 className='font-medium'>{product.price}</h4>
          <div>
            <button type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2" onClick={()=>{navigate(`/dashboard/productDetails/${product._id}`),window.location.reload();
}}>See Details</button>
            <button type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2" onClick={()=>{
              if(!isLoggedIn){navigate("/login");return;}
              setCart([product,...cart])
              toast.success("Added to cart successfully")
            }}>Add to Cart</button>
          </div>
          </div>
        </div>
      ))}
      </div>
      </div>

</div>
    ):<h1>Loading...</h1>
    }
    </div>
  )
}

export default ProductDetails