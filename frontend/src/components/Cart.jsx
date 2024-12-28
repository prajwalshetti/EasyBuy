import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useOrder } from '../context/PrevOrder.jsx';
import { useAuth } from '../context/auth.jsx';
import { AlertCircle, ShoppingBag, Trash2, ExternalLink } from 'lucide-react';

function Cart() {
  const { user, setUser } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const { prevOrders, setPrevOrders } = useOrder();

  const showOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/order/showOrders', { withCredentials: true });
      setPrevOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter(product => product._id !== id);
    setCart(updatedCart);
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, product) => sum + product.price, 0);
  };

  const placeOrder = async () => {
    try {
      const products = cart.map(product => product._id);
      const response = await axios.post(
        "http://localhost:8000/api/v1/order/createOrder",
        { products },
        { withCredentials: true }
      );
      if (response.status === 200) {
        closeModal();
        setCart([]);
        showOrders();
        navigate("/dashboard/order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-yellow-400 animate-pulse" />
          <h1 className="text-2xl font-semibold text-gray-700">Your cart is empty</h1>
          <p className="text-gray-500">Start adding some items to your cart!</p>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cart.length} items)</h1>
        
        <Modal isVisible={isModalVisible} onClose={closeModal} title="Confirm your order">
        <div className='flex flex-col'>

        <input type="text" name="address" id="address" placeholder='Enter your address' className='m-2 p-2 border border-black rounded'/>

        <button onClick={()=>{placeOrder()}} type="button" className="pl-3 pr-3 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 mt-10">Pay {getTotalAmount()}</button>

        </div>
      </Modal>
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product._id}
              className="bg-orange-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center p-6">
                <div className="flex-shrink-0 w-40 h-40">
                  <div className="w-full h-full">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{product.category.name}</p>
                      <h3 className="text-xl font-medium text-gray-900">{product.name}</h3>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{product.price} Rs.</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={() => navigate(`/dashboard/productDetails/${product._id}`)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </button>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 right-6">
          <button
            onClick={openModal}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="font-medium">Checkout Total: {getTotalAmount()} Rs.</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;