import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { LogIn, Mail, Lock, UserPlus, Home, Cookie, LogOut, AlertCircle, CheckCircle } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/loginuser", {
                email,
                password
            }, { withCredentials: true });

            if (response.status === 200) {
                setSuccess("User Logged in successfully");
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setError("User Login Failed");
            }
        } catch (error) {
            setError("User Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const checkForCookie = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/v1/user/checkForVerifyJWT", { withCredentials: true });
            if (response.status === 200) {
                setSuccess("Valid session found");
            } else {
                setError("No valid session found");
            }
        } catch (error) {
            setError("No valid session found");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/logoutuser", {}, { withCredentials: true });
            if (response.status === 200) {
                setSuccess("Logged out successfully");
            } else {
                setError("Logout Failed");
            }
        } catch (error) {
            setError("Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto space-y-8">
                {/* Glass Card Container */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <LogIn className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
                            Welcome Back
                        </h2>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="flex items-center p-4 bg-red-50 rounded-lg text-red-800 animate-fade-in">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center p-4 bg-green-50 rounded-lg text-green-800 animate-fade-in">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Additional Actions */}
                    <div className="space-y-4">
                        {/* Session Management */}
                        {/* <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={checkForCookie}
                                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                <Cookie className="h-4 w-4 mr-2" />
                                Check Session
                            </button>
                            <button
                                onClick={logout}
                                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div> */}

                        {/* Navigation */}
                        <div className="text-center">
                            <span className="text-sm text-gray-600">Don't have an account?</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                            >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Register
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                            >
                                <Home className="h-4 w-4 mr-2" />
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;