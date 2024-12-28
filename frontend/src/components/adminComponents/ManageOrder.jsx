import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PackageSearch, Phone, User, Save } from 'lucide-react';

function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const statusColors = {
    'Processing': 'bg-green-100 text-green-800',
    'Out for delivery': 'bg-green-100 text-green-800',
    'Delivered': 'bg-green-100 text-green-800'
  };

  const changeStatus = async (status, id) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/order/changeStatus/${id}`, 
        { status }, 
        { withCredentials: true }
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    const showOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/v1/order/getAllOrders', 
          { withCredentials: true }
        );
        if (response.status === 200) {
          setOrders(response.data);
          const initialStatus = response.data.reduce((acc, order) => {
            acc[order._id] = order.status;
            return acc;
          }, {});
          setStatus(initialStatus);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error("Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };
    showOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center gap-2">
        <PackageSearch className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-orange-200 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {order.buyer.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">+919454830294</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.products.map((product) => (
                    <div 
                      key={product._id} 
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg w-full max-w-xs"
                    >
                      <img 
                        src={product.photo} 
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-lg shadow-sm mb-3"
                      />
                      <h3 className="text-sm font-medium text-gray-900 text-center">
                        {product.name}
                      </h3>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-4">
                  <select
                    value={status[order._id]}
                    onChange={(e) => setStatus({...status, [order._id]: e.target.value})}
                    className={`px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      statusColors[status[order._id]]
                    }`}
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Processing">Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  
                  <button
                    onClick={() => changeStatus(status[order._id], order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Save className="w-4 h-4" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default ManageOrder;
