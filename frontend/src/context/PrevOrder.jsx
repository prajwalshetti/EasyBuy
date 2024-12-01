import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const OrderContext = createContext();

// Create a provider component
export const OrderProvider = ({ children }) => {
    const [prevOrders,setPrevOrders]=useState([])

    useEffect(() => {
        const u = localStorage.getItem("order"); // Correct key
        if (u) {
            setPrevOrders(JSON.parse(u)); // Parse the stored JSON
        }
    }, []);

    useEffect(()=>{localStorage.setItem('order',JSON.stringify(prevOrders))},[prevOrders])


    return (
        <OrderContext.Provider value={{prevOrders,setPrevOrders}}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook for using the AuthContext
export const useOrder = () => useContext(OrderContext);
