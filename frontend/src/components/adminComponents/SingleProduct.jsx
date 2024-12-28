import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product state
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0
  });

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/product/updateProduct/${id}`,
        {
          ...formData,
          category: product.category // Preserve the original category
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate('/dashboard/adminDashboard/productList');
      } else {
        setError('Failed to update product. Please try again.');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred while updating the product'
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete product handler
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setError('');
    setLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/product/deleteProduct/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate('/dashboard/adminDashboard/productList');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to delete product'
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/getSingleProduct/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          quantity: response.data.quantity
        });
      }
    } catch (error) {
      setError('Failed to fetch product details');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-orange-200 rounded-lg shadow-md p-6">
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          {product && (
            <div className="flex justify-center items-start">
              <div className="bg-white p-4 rounded-lg shadow">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded"
                />
              </div>
            </div>
          )}

          {/* Product Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;