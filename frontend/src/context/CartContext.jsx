import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cart,setCart]=useState([])

    useEffect(() => {
        const u = localStorage.getItem("cart1"); // Correct key
        if (u) {
            setCart(JSON.parse(u)); // Parse the stored JSON
        }
    }, []);

    useEffect(()=>{localStorage.setItem('cart1',JSON.stringify(cart))},[cart])


    return (
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using the AuthContext
export const useCart = () => useContext(CartContext);
