import React, { useEffect, useState } from "react";

function Modal({ isVisible, onClose, title, children }) {
  const [showModal, setShowModal] = useState(false);

  // Handle the animation state
  useEffect(() => {
    if (isVisible) {
      setShowModal(true); // Show the modal with animation
    } else {
      setTimeout(() => setShowModal(false), 300); // Wait for animation to finish before unmounting
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-1/3 transform ${
          isVisible ? "scale-100" : "scale-90"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
