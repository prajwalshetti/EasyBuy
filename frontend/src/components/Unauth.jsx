import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

function Unauth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="flex justify-center">
          <ShieldAlert className="h-24 w-24 text-red-500 animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Unauthorized Access
          </h1>
          <p className="text-gray-600">
            Sorry, you don't have permission to access this page. Please return to the dashboard
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-2 mx-auto"
        >
          <Home className="w-4 h-4" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Unauth;