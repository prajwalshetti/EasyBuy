import { useEffect, useState }  from 'react'
import axios from "axios"

function Category() {
  const [newCategory, setNewCategory] = useState('');
  const [updatedCategoryName,setUpdatedCategoryName]=useState("")
  const [categories,setCategories]=useState([])
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const toggleModal = (id = null) => {
    setCurrentCategoryId(id); // Set the current category ID
    setIsModalOpen(!isModalOpen);
    setUpdatedCategoryName(""); // Clear the input field
  };

  const handleConfirm = async () => {
    await editCategory(currentCategoryId)
    setCurrentCategoryId(null)
    setIsModalOpen(false); // Close the modal
  };
  

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/category/getAllCategories"); // Correct URL
      if (response.status === 200) {
        setCategories(response.data)
        console.log(response.data)
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(()=>{getAllCategories()},[])

  const addCategory = async() => {
    if (newCategory.trim()) {
      try {
        const response=await axios.post("http://localhost:8000/api/v1/category/createCategory",{
          name:newCategory
        },{withCredentials:true})
        if(response.status===200){
          setNewCategory('');
          getAllCategories();
          console.log("added")
        }
        else{
          console.log("Not added")
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  const editCategory=async(id)=>{
    try {
      if(updatedCategoryName){
        const response=await axios.post(`http://localhost:8000/api/v1/category/updateCategory/${id}`,{ name: updatedCategoryName },{withCredentials:true})
        if(response.status===200){
          getAllCategories()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCategory = async(id) => {
    try {
        const response=await axios.delete(`http://localhost:8000/api/v1/category/deleteCategory/${id}`,{withCredentials:true})
        if(response.status===200){
          getAllCategories()
        }
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div className="max-w-xl mx-auto mt-10 p-4 rounded-lg shadow-lg bg-orange-200">
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">

              {/* Modal Content */}
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-semibold text-black">
                  Write the new name here
                </h3>
                <input type="text" value={updatedCategoryName} onChange={(e)=>setUpdatedCategoryName(e.target.value)} name="editedCategoryName" id="editedCategoryName" placeholder='New Name...'className='border border-black p-1 mb-5'/>

                <div>
                  <button onClick={handleConfirm} type="button" className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Save
                  </button>
                  <button onClick={()=>toggleModal()} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-600 rounded-lg border border-gray-200 hover:bg-red-800">
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center">Manage Category</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a new Category..."
        />
        <button
          onClick={addCategory}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center mb-2 font-semibold">
              {category.name}
              <div>
              <button
                  onClick={()=>toggleModal(category._id)}
                  className="p-1 pl-3 pr-3 mr-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Edit
              </button>
              <button
                onClick={() => deleteCategory(category._id)} // Pass null explicitly to reset the currentCategoryId
                type="button"
                className="p-1 pl-3 pr-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category