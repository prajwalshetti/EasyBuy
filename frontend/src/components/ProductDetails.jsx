import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/auth';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [productResponse, similarResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/product/getSingleProduct/${id}`, { 
            withCredentials: true 
          }),
          axios.get(`http://localhost:8000/api/v1/product/getSimilarProducts/${id}`)
        ]);

        if (productResponse.status === 200) {
          setProduct(productResponse.data);
        }
        if (similarResponse.status === 200) {
          setSimilarProducts(similarResponse.data);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (productToAdd) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setCart([productToAdd, ...cart]);
    toast.success("Added to cart successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="p-8">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                {product.category.name}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.8/5)</span>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-8 flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="ml-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <div
                key={similarProduct._id}
                className="bg-orange-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-4">
                  <img
                    src={similarProduct.photo}
                    alt={similarProduct.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {similarProduct.name}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    ₹{similarProduct.price}
                  </p>
                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        navigate(`/dashboard/productDetails/${similarProduct._id}`);
                        window.location.reload();
                      }}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      See Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(similarProduct)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;