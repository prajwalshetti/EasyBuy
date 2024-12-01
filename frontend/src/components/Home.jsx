import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from './Modal.jsx';
import { useCart } from '../context/CartContext.jsx';

function Home() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState("")
  const {cart,setCart}=useCart()

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
useEffect(()=>{getAllCategories()},[])

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const {user,setUser}=useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products,setProducts]=useState([])
  const navigate=useNavigate()
  const [minPrice,setMinPrice]=useState(0)
  const [maxPrice,setMaxPrice]=useState(100000)
  const {search,setSearch}=useAuth()

  const getAllProducts=async()=>{
    try {
      const response=await axios.get("http://localhost:8000/api/v1/product/getAllProducts",{params:{
        minPrice,
        maxPrice,
        category,
        search
      },withCredentials:true})
      if(response.status===200){
        setProducts(response.data.products)
        closeModal()
      }else{
        toast.error("No products found")
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      toast.error("No products found")
    }
  }
  useEffect(()=>{getAllProducts()},[search])

  const clearFilter=async()=>{
    setMinPrice(0)
    setMaxPrice(100000)
    setCategory("")
    setSearch("")
    getAllProducts()
  }

  const checkForCookie = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/checkForVerifyJWT", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSuccess("Cookie found");
        setIsLoggedIn(true);
        setUser(response.data.user)
        localStorage.setItem("UserDetails",JSON.stringify(response.data.user))
      } else {
        setError("No cookie");
        setIsLoggedIn(false);
        setUser(null)
      }
    } catch (err) {
      console.error(err);
      setError("No cookie");
      setIsLoggedIn(false);
      setUser(null)
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };
  useEffect(()=>{checkForCookie()},[]);

  return (
    <div className='bg-gray-300'>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error: </span> {error}
        </div>
      )}

      {success && (
        <div
          className="text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <span className="font-medium">Success: </span> {success}
        </div>
      )}
      <div className='flex justify-around'>

        
      
      <div className='flex justify-center items-center flex-wrap bg-gray-300'>
      {products.map((product)=>(
        <div key={product._id} className=' hover:cursor-pointer  relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
          <div style={{width:"19rem"}} className='bg-white p-1 text-center'>
          <img src={product.photo} className='m-1'></img>
          <h3 className='font-semibold'>{product.name}</h3>
          <h4 className='font-medium'>{product.price}</h4>
          <div>
            <button type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2" onClick={()=>{navigate(`/dashboard/productDetails/${product._id}`)}}>See Details</button>
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

    <div className=' p-1 mt-2 mr-2 flex flex-col'>
    <div className='sticky top-[10px] gap-2 right-2 flex flex-col'>
      <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 pl-4 pr-4">Apply Filters</button>
      <button onClick={clearFilter} type="button" className=" pl-2 pr-2 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2">Clear Filters</button>
    </div>

      <Modal isVisible={isModalVisible} onClose={closeModal} title="Enter your preferneces">
        <div className='flex flex-col'>
        <label className=" text-sm font-medium text-gray-900 mb-2">Product Category</label>
                <select id='category' value={category} onChange={(e)=>setCategory(e.currentTarget.value)} className='min-w-[200px] bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5' required>
                    <option value='' disabled>Select a category</option>
                    {categories.map((cat)=>(
                        <option key={cat._id} value={cat._id} >
                           {cat.name} 
                        </option>
                    ))}
                </select>
          
                <label className=" text-sm font-medium text-gray-900 mb-2 mt-5">Price Range</label>
                <div className='flex flex-col m-1'>
                    <input type="number" name="minPrice" id="minPrice" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} className='border border-black rounded bg-gray-100 pl-2 max-w-25'/>
                    <label className=" text-sm font-medium text-gray-900 ml-2 mt-1 mb-1">to</label>
                    <input type="number" name="maxPrice" id="maxPrice" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} className='border border-black rounded bg-gray-100 pl-2 max-w-25'/>
                </div>

                <button onClick={()=>{getAllProducts()}} type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2">Apply Filters</button>

        </div>
      </Modal>
    </div>


      <ToastContainer/>
      </div>
    </div>
  );
}

export default Home;
