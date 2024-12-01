import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SingleProduct() {
    const {id}=useParams()
    const [product,setProduct]=useState(null)
    const navigate=useNavigate()

    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState(0)
    const [quantity,setQuantity]=useState(0)
    const [category,setCategory]=useState("")
    const [shipping,setShipping]=useState(false)
    const [photo,setPhoto]=useState(null)
    const [categories,setCategories]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post(`http://localhost:8000/api/v1/product/updateProduct/${id}`,{
                name,
                description,
                price,
                quantity,
                category
            },{withCredentials:true})
        if(response.status===200)
        {
            navigate("/dashboard/adminDashboard/productList")
        }
        else{
            console.log("Failed to update product")
        }
        } catch (error) {
            console.log(error)
        }
    }

    const getSingleProduct=async()=>{
        try {
            const response=await axios.get(`http://localhost:8000/api/v1/product/getSingleProduct/${id}`,{withCredentials:true})
            console.log("hi")
            if(response.status===200){
                console.log(response.data)
                setProduct(response.data)
                setName(response.data.name)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setQuantity(response.data.quantity)
                setCategory(response.data.category)
                
            }else{
                console.log("Failed to fetch the product")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/category/getAllCategories");
          if (response.status === 200) {
            setCategories(response.data)
            console.log(response.data)
          }
        } catch (err) {
          console.error("Error fetching users:", err);
        }
      };

      const deleteProduct=async()=>{
        try {
          const response=await axios.delete(`http://localhost:8000/api/v1/product/deleteProduct/${id}`,{withCredentials:true})
          if(response.status===200)
          {
            navigate("/dashboard/adminDashboard/productList")
          }
          else
          {
            console.log(response) 
          }
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=>{getSingleProduct()},[])
    useEffect(()=>{getAllCategories()},[])
  return (
    <div className='bg-gray-300 flex justify-around items-center p-5'>
        {
            product?(<div className='p-5'>
                <div style={{width:"19rem"}} className='bg-white p-1 text-center'>
              <img src={product.photo} className='m-1'></img>
              <h3 className='font-semibold'>{product.name}</h3>
              </div>
            </div>):<h1>No object present</h1>
        }

        <form onSubmit={handleSubmit} className='max-w-full mt-3 flex flex-col justify-center items-center'>
            <div className="mb-3">
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="min-w-[400px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5" required />
            </div>

            <div className="mb-3">
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                <input type="text" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="min-w-[400px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5" required />
            </div>

            <div className="mb-3">
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                <input type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} className="min-w-[400px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5" required />
            </div>

            <div className="mb-3">
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product quantity</label>
                <input type="text" id="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="min-w-[400px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5" required />
            </div>

            <div className="mb-3">
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
                <select id='category' value={category} onChange={(e)=>setCategory(e.currentTarget.value)} className='min-w-[400px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5' required>
                    <option value='' disabled>Select a category</option>
                    {categories.map((cat)=>(
                        <option key={cat._id} value={cat._id} >
                           {cat.name} 
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex justify-center items-center'>
                <button type="submit" className="pl-5 pr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-10">Save</button>
                <button onClick={deleteProduct} className="pl-5 pr-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-10">Delete</button>
            </div>
        </form>
        <div></div>
    </div>
  )
}

export default SingleProduct