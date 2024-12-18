import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creating the CartAPIContext to provide cart data and methods
export const CartAPIContext = createContext();

const CartAPIProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the server
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5020/api/cart');
      setCartItems(response.data);
      return response.data;  // Returning data for possible future use
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  };

  // Remove a single item from the cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5020/api/cart/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Clear all items from the cart
  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:5020/api/cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartAPIContext.Provider value={{ cartItems, fetchCart, removeFromCart, clearCart }}>
      {children}
    </CartAPIContext.Provider>
  );
};

export default CartAPIProvider;


  
