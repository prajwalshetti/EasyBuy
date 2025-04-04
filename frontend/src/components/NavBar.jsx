import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/CartContext";
import { Search, ShoppingCart, Package, User, Home, LogIn, UserPlus, Settings, Lock,MessageSquare,MessageSquareIcon } from 'lucide-react';
import { useState } from "react";

function NavBar() {
  const { isLoggedIn, user, search, setSearch } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const NavItem = ({ to, children, end = false, requiresAuth = false }) => (
    <NavLink
      to={requiresAuth && !isLoggedIn ? "/login" : to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
          isActive
            ? "text-blue-600 bg-white shadow-md font-semibold transform -translate-y-0.5"
            : "text-gray-700 hover:text-blue-600 hover:bg-white/50"
        } ${requiresAuth && !isLoggedIn ? "opacity-75" : ""}`
      }
    >
      {children}
      {requiresAuth && !isLoggedIn && (
        <Lock className="w-3 h-3 absolute top-1 right-1 text-gray-500" />
      )}
    </NavLink>
  );

  // Handle the search and navigate to Home
  const handleSearch = (e) => {
    setSearch(e.target.value);
    navigate('/dashboard'); // Redirect to the home page
  };

  // Handle "Enter" key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/'); // Redirect to the home page when "Enter" is pressed
    }
  };

  return (
    <nav className="top-0 z-50 w-full backdrop-blur-sm bg-pink-200 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu Items */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavItem to="/dashboard" end>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavItem>

            <NavItem to="/dashboard/profile" requiresAuth>
              <User className="w-4 h-4" />
              <span>Profile</span>
            </NavItem>

            {!isLoggedIn && (
              <>
                <NavItem to="/">
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </NavItem>
                <NavItem to="/login">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </NavItem>
              </>
            )}

            {isLoggedIn && user.role === 1 && (
              <NavItem to="/dashboard/adminDashboard">
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </NavItem>
            )}
          </div>

          <div className="bg-white border rounded-full flex items-center px-4 py-2 mx-auto lg:w-1/3 hover:shadow-lg">
            <span className="text-gray-600">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-gray-600 text-sm font-medium ml-2 w-full"
            />
          </div>

          {/* Right side - Orders & Cart */}
          <div className="flex items-center space-x-4">
            <NavItem to="/dashboard/order" requiresAuth>
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </NavItem>

            <div className="relative">
              <NavItem to="/dashboard/cart" requiresAuth>
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {cart?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </NavItem>
            </div>

            
            {isLoggedIn&&user&&user.role==0&&<NavItem to="/dashboard/chat" requiresAuth>
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </NavItem>}
            
            <NavItem to="/aiagent">
              <User className="w-4 h-4" />
              <span>AI Agent</span>
            </NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;