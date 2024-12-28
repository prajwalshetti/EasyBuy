import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Plus, Edit2, Trash2, X, Save, FolderPlus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [newCategory, setNewCategory] = useState('');
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleModal = (id = null) => {
    setCurrentCategoryId(id);
    setIsModalOpen(!isModalOpen);
    setUpdatedCategoryName("");
  };

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/category/getAllCategories");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/category/createCategory",
          { name: newCategory },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Category added successfully");
          setNewCategory('');
          getAllCategories();
        }
      } catch (error) {
        toast.error("Failed to add category");
        console.log(error);
      }
    }
  };

  const handleConfirm = async () => {
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/category/updateCategory/${currentCategoryId}`,
        { name: updatedCategoryName },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Category updated successfully");
        getAllCategories();
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.log(error);
    }
    setCurrentCategoryId(null);
    setIsModalOpen(false);
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/category/deleteCategory/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Category deleted successfully");
          getAllCategories();
        }
      } catch (error) {
        toast.error("Failed to delete category");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-orange-200 rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <FolderPlus className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a new category..."
            />
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="font-medium text-gray-700">{category.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleModal(category._id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-center py-4 text-gray-500">Loading categories...</div>
            )}

            {!loading && categories.length === 0 && (
              <div className="text-center py-4 text-gray-500">No categories found</div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => toggleModal()}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Edit Category
                  </h3>
                  <input
                    type="text"
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter new category name..."
                  />
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirm}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => toggleModal()}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Category;