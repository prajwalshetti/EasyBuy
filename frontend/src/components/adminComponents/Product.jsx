import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Package, Plus, Edit, Grid, List } from 'lucide-react';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/getAllProducts", 
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      console.log(error);
      toast.error("No products found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/product/deleteProduct/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Deleted successfully");
        getAllProducts();
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Deletion failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              {products.length} products available
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            {/* Add Product Button */}
            <button
              onClick={() => navigate('/dashboard/adminDashboard/createProduct')}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Product Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/dashboard/adminDashboard/product/${product._id}`)}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-64 object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-end">
                    <button
                      className="flex items-center text-orange-600 hover:text-orange-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                onClick={() => navigate(`/dashboard/adminDashboard/product/${product._id}`)}
              >
                <div className="flex items-center p-4 cursor-pointer">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                  <button
                    className="flex items-center text-orange-600 hover:text-orange-700 px-4 py-2"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Product;