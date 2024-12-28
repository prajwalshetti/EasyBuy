import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from './Modal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { AlertCircle, ShoppingCart, Filter, X, Package, RefreshCw } from 'lucide-react';

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { cart, setCart } = useCart();
  const { isLoggedIn, setIsLoggedIn, user, setUser, search, setSearch } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(false);

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/category/getAllCategories");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/getAllProducts", {
        params: { minPrice, maxPrice, category, search },
        withCredentials: true
      });
      if (response.status === 200) {
        setProducts(response.data.products);
        closeModal();
        setActiveFilters(category !== "" || minPrice > 0 || maxPrice < 100000 || search !== "");
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      toast.error("No products found");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilter = async () => {
    setMinPrice(0);
    setMaxPrice(100000);
    setCategory("");
    setSearch("");
    setActiveFilters(false);

    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/product/getAllProducts", {
        params: { minPrice: 0, maxPrice: 100000, category: "", search: "" },
        withCredentials: true
      });
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error("Error resetting products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [search]);

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
        setUser(response.data.user);
        localStorage.setItem("UserDetails", JSON.stringify(response.data.user));
      } else {
        setError("No cookie");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      setError("No cookie");
      setIsLoggedIn(false);
      setUser(null);
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  useEffect(() => {
    checkForCookie();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-800">No Products Found</h1>
          <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          {activeFilters && (
            <button
              onClick={clearFilter}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Our Products
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({products.length} items)
            </span>
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={clearFilter}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                activeFilters
                  ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
            <button
              onClick={openModal}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-64 object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-orange-600 mb-4">
                  ₹{product.price}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/productDetails/${product._id}`)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/login");
                        return;
                      }
                      setCart([product, ...cart]);
                      toast.success("Added to cart successfully");
                    }}
                    className="flex-1 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal isVisible={isModalVisible} onClose={closeModal} title="Filter Products">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={getAllProducts}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;