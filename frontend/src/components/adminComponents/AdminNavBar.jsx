import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Layout, 
  Package, 
  PlusCircle, 
  ShoppingBag,
  Users,
  ClipboardList
} from 'lucide-react';

function AdminNavBar() {
  const NavItem = ({ to, icon: Icon, children, end = false }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "text-blue-600 bg-white shadow-md font-semibold transform -translate-y-0.5"
            : "text-gray-700 hover:text-blue-600 hover:bg-white/50"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </NavLink>
  );

  return (
    <nav className="top-16 z-40 w-full bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 border-y border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-1 w-full justify-around">
            <NavItem to="/dashboard/adminDashboard" icon={Layout} end>
              Create Category
            </NavItem>
            
            <NavItem to="/dashboard/adminDashboard/createProduct" icon={PlusCircle}>
              Create Product
            </NavItem>
            
            <NavItem to="/dashboard/adminDashboard/productList" icon={Package}>
              Products
            </NavItem>
            
            <NavItem to="/dashboard/adminDashboard/manageOrder" icon={ShoppingBag}>
              Manage Orders
            </NavItem>
            
            <NavItem to="/dashboard/adminDashboard/seeUsersList" icon={Users}>
              Users List
            </NavItem>

            <NavItem to="/dashboard/adminDashboard/adminChat" icon={Users}>
              Admin Chat
            </NavItem>
          </div>
        </div>
      </div>

    </nav>
  );
}

export default AdminNavBar;