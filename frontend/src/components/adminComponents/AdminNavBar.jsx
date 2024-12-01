import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavBar() {
  return (
    <>
      <nav>
        <header className="border-t border-b border-black bg-white font-sans min-h-[60px] px-10 bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 flex justify-center">
          <div className="flex items-center justify-around min-w-full">
            <NavLink
              to="/dashboard/adminDashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-600 hover:text-blue-500 font-bold"
              }
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/adminDashboard/createProduct"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-600 hover:text-blue-500 font-bold"
              }
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/adminDashboard/productList"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-600 hover:text-blue-500 font-bold"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/dashboard/adminDashboard/manageOrder"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-600 hover:text-blue-500 font-bold"
              }
            >
              Manage Orders
            </NavLink>
            <NavLink
              to="/dashboard/adminDashboard/seeUsersList"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-600 hover:text-blue-500 font-bold"
              }
            >
              See All Users
            </NavLink>
          </div>
        </header>
      </nav>
    </>
  );
}

export default AdminNavBar;
