import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser]=useState(null);
    const [search,setSearch]=useState("");

    useEffect(() => {
        const u = localStorage.getItem("UserDetails"); // Correct key
        if (u) {
            setUser(JSON.parse(u)); // Parse the stored JSON
            setIsLoggedIn(true);
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,user,setUser,search,setSearch}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
