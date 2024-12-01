import { NavLink,Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { user, setUser } = useAuth();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const { search, setSearch } = useAuth();
  const { cart, setCart } = useCart();

  return (
    <>
      <nav>
        <header className="border-b bg-white font-sans min-h-[60px] px-10 py-3 relative z-50 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 ">
          <div className="flex items-center justify-between">
            {/* Menu Items */}
            <div className="hidden lg:flex lg:items-center gap-x-8">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold"
                : "text-gray-600 hover:text-blue-500 font-bold"
            }
          >
            Home
          </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-600 hover:text-blue-500 font-bold"
                }
              >
                Profile
              </NavLink>

              {/* Register */}
              {!isLoggedIn && (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-gray-600 hover:text-blue-500 font-bold"
                  }
                >
                  Register
                </NavLink>
              )}

              {/* Login */}
              {!isLoggedIn && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-gray-600 hover:text-blue-500 font-bold"
                  }
                >
                  Login
                </NavLink>
              )}

              {/* Admin Dashboard */}
              {isLoggedIn && user.role === 1 && (
                <NavLink
                  to="/dashboard/adminDashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-gray-600 hover:text-blue-500 font-bold"
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}
            </div>

            {/* Search Box */}
            <div className="bg-white border rounded-full flex items-center px-4 py-2 mx-auto lg:w-1/3 hover:shadow-lg">
              <span className="text-gray-600">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-gray-600 text-sm font-medium ml-2 w-full"
              />
            </div>

            {/* Your Orders */}
            <NavLink
              to="/dashboard/order"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold mr-10"
                  : "text-gray-600 hover:text-blue-500 font-bold mr-10"
              }
            >
              Your Orders
            </NavLink>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <div
                className="relative flex"
                onClick={() => {
                  if (!isLoggedIn) navigate("/login");
                }}
              >
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-gray-600 hover:text-blue-500 font-bold"
                  }
                >
                  Cart {cart?.length}
                </NavLink>
                <Link to="/dashboard/cart" className="cursor-pointer hover:text-blue-500">
                  🛒
                </Link>
              </div>
            </div>
          </div>
        </header>
      </nav>
    </>
  );
}

export default NavBar;
