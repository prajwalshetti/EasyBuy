import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useOrder } from '../context/PrevOrder';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Package, Phone } from 'lucide-react';

function Order() {
  const { prevOrders, setPrevOrders } = useOrder();
  const { isLoggedIn } = useAuth();
  const [isLoading,setIsLoading]=useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const showOrders = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://localhost:8000/api/v1/order/showOrders', { withCredentials: true });
        setPrevOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      } finally{
        setIsLoading(false)
      }
    };
    showOrders();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/dashboard/");
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        <div className="space-y-6">
          {prevOrders.map((order) => (
            <div 
              key={order._id} 
              className={`${getStatusColor(order.status)} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-500">Order ID #{order._id.slice(-8)}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.products.map((product) => (
                    <div 
                      key={product._id}
                      className="flex flex-col bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <div className="relative h-48 w-full">
                        <img 
                          src={product.photo} 
                          alt={product.name}
                          className="absolute w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Need help? Contact us at +919454830294</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Order;