import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useOrder } from '../context/PrevOrder.jsx';
import { useAuth } from '../context/auth.jsx';

function Cart() {
  const {user,setUser}=useAuth()
  const {cart,setCart}=useCart()
  const navigate=useNavigate()
  const [isModalVisible, setModalVisible] = useState(false);
  const {prevOrders,setPrevOrders}=useOrder()

  const showOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/order/showOrders',{withCredentials:true}); // Update with your API endpoint
      setPrevOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }}

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const removeFromCart=async (id)=>{
    const updatedCart=cart.filter(product=>product._id!==id)
    setCart(updatedCart)
  }

    const getTotalAmount = () => {
      return cart.reduce((sum, product) => sum + product.price, 0);
    };

  const placeOrder=async()=>{
    try {
      const products=cart.map(product=>product._id)
      const response=await axios.post("http://localhost:8000/api/v1/order/createOrder",{products},{withCredentials:true})
      if(response.status===200){
        closeModal()
        setCart([])
        showOrders()
        navigate("/dashboard/order")
      }
      else{
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(cart.length==0){
    return(
        <div className='flex flex-col justify-center items-center mt-32 scale-125'>
          <div className='bg-cyan-300 p-10 rounded-md'>
          <h1 className='font-semibold scale-125'>Your cart is empty</h1>
          <button onClick={()=>{navigate("/dashboard")}} type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2">Start Shopping</button>
          </div>
        </div>
    )
  }

  return (
    <div className='flex justify-center items-center bg-gray-300 flex-col'>


<Modal isVisible={isModalVisible} onClose={closeModal} title="Confirm your order">
        <div className='flex flex-col'>

        <input type="text" name="address" id="address" placeholder='Enter your address' className='m-2 p-2 border border-black rounded'/>

        <button onClick={()=>{placeOrder()}} type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 mt-10">Pay {getTotalAmount()}</button>

        </div>
      </Modal>

{
    cart.map((product)=>(<div>
      <section key={product._id} className="text-gray-700 body-font overflow-hidden bg-white m-1 mt-5 max-w-screen-md max-h-64">
        <div className="container px-5 py-5 mx-auto">
          <div className="mx-auto flex flex-wrap">
      <img alt="ecommerce" className='w-1/3 h-1/3 bg-white p-1 text-center pt-8' src={product.photo}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.name}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
      
              
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{product.price} Rs.</span>
                <button type="button" className="flex ml-auto text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm p-2 text-center m-2" onClick={()=>{navigate(`/dashboard/productDetails/${product._id}`)}}>See Details</button>
                <button type="button" className="flex ml-auto text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm p-2 text-center m-2" onClick={()=>{removeFromCart(product._id)}}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>))
}
<div className='fixed bottom-0 right-10'><button type="button" className="ml-auto text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm p-2 text-center mt-5 mb-5 scale-125 " onClick={openModal}>Purchase</button></div>
    </div>
  )
}

export default Cart