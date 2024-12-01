import React, { useState,useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProduct() {
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
            const response=await axios.post("http://localhost:8000/api/v1/product/createProduct",{
                name,
                description,
                price,
                shipping,
                quantity,
                category,
                photo
            },{withCredentials:true,headers: {
                "Content-Type": "multipart/form-data",
            },})
            if(response.status===200){
                toast.success("Product created successfully")
                setName("")
                setDescription("")
                setPrice(0)
                setQuantity(0)
                setPhoto(null)
                setCategory("")
            }else{
                console.log(response)
                toast.error("Product creation failed")
            }
        } catch (error) {
            console.log(error)
            toast.error("Product creation failed")
        }
    }

    const getAllCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/category/getAllCategories"); // Correct URL
          if (response.status === 200) {
            setCategories(response.data)
            console.log(response.data)
          }
        } catch (err) {
          console.error("Error fetching users:", err);
        }
      };
    useEffect(()=>{getAllCategories()},[])

  return (
    <div className='bg-gray-300'>
        <form onSubmit={handleSubmit} className='max-w-full p-3 flex flex-col justify-center items-center'>
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


            <div className='mb-3'>
                <label className=" text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                <input onChange={(e)=>setPhoto(e.target.files[0])} className="min-w-[400px] block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file"/>
            </div>

            <div className='flex justify-center mb-1'><button type="submit" className="pl-10 pr-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Submit</button></div>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default CreateProduct