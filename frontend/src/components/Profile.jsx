import React from 'react';
import { useAuth } from '../context/auth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, UserCircle, LogOut } from 'lucide-react';

function Profile() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/logoutuser",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Loading...</h1>
        <p className="text-gray-500 mb-6">Please wait while we load your profile.</p>
        <div className="space-y-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const userInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: user.email },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: user.phone },
    { icon: <MapPin className="w-5 h-5" />, label: "Address", value: user.address },
    { 
      icon: <UserCircle className="w-5 h-5" />, 
      label: "Role", 
      value: user.role === 1 ? "Admin" : "Customer",
      badge: user.role === 1 ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          {/* Profile Header */}
          <div className={`relative h-32 ${user.role === 1 ? "bg-purple-500" : "bg-blue-500"}`}>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-3xl font-bold text-blue-600">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </h1>

            <div className="space-y-6">
              {userInfo.map((info, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-gray-500">{info.icon}</div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">{info.label}</p>
                    <p className="text-sm text-gray-900">{info.value}</p>
                  </div>
                  {info.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${info.badge}`}>
                      {info.value}
                    </span>
                  )}
                </div>
              ))}

              <div className="pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;