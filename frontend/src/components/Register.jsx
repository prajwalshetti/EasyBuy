import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserPlus, Mail, Phone, MapPin, Lock, Shield, LogIn, Home, AlertCircle, CheckCircle } from 'lucide-react';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [adminSecretKey, setAdminSecretKey] = useState("");
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
            const calculatedRole = (adminSecretKey === "BMSCE" ? 1 : 0);
            if(Number(role)!==Number(calculatedRole)){
                setError("Wrong admin password");
                return;
            }

            const response = await axios.post("http://localhost:8000/api/v1/user/register", {
                username,
                email,
                phone,
                address,
                role: Number(calculatedRole),
                password
            });
            if (response.status === 200) {
                setSuccess("User registered successfully");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setError("User registration failed");
            }
        } catch (error) {
            setError("User registration failed");
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
                            <UserPlus className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
                            Create Account
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
                            {/* Username Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserPlus className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

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

                            {/* Phone Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Field */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        rows="2"
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

                            {/* Admin Role Toggle */}
                            <div className="relative">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                {/* Toggle Switch */}
                                <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={role === 1}
                                    onChange={(e) => setRole(e.target.checked ? 1 : 0)}
                                    className="sr-only"
                                />
                                {/* Toggle Track */}
                                <div
                                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                                    role === 1 ? 'bg-purple-500' : 'bg-gray-300'
                                    }`}
                                >
                                    {/* Toggle Thumb */}
                                    <div
                                    className={`absolute top-0.5 left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                                        role === 1 ? 'translate-x-6' : ''
                                    }`}
                                    />
                                </div>
                                </div>
                                {/* Label */}
                                <span className="text-sm font-medium text-gray-700">Register as admin</span>
                            </label>
                            </div>



                            {/* Admin Secret Key */}
                            {role === 1 && (
                                <div className="relative animate-fade-in">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Secret Key</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Shield className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={adminSecretKey}
                                            onChange={(e) => setAdminSecretKey(e.target.value)}
                                            className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Footer Actions */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <span className="text-sm text-gray-600">Already have an account?</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
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

export default Register;