'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import clsx from 'clsx';

export const ValueContext = createContext();

export const ValueProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState('');
    const { user } = useUser();

    useEffect(() => {
        axios.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    useEffect(() => {
        if (user) {
            axios.post('/api/cart/get', { userId: user.id })
                .then(res => {
                    setCart(res.data.cart || []);
                })
                .catch(err => console.error('Error fetching cart:', err));
        }
    }, [user]);


    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };


    const handleAddToCart = async (product) => {
        if (!user) {
            showNotification('Please sign in to use the cart.');
            return;
        }

        const exists = cart.find(item => item.productId === product.id);
        if (!exists) {
            const newItem = {
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            };

            const updatedCart = [...cart, newItem];
            setCart(updatedCart);

            try {
                await axios.post('/api/cart/add', {
                    userId: user.id,
                    item: newItem
                });
            } catch (error) {
                console.error('Add to cart failed:', error);
            }
        }
    };

    const handleRemoveFromCart = async (title) => {
        if (!user) {
            showNotification('Please sign in to use the cart.');
            return;
        }

        const updatedCart = cart.filter(item => item.title !== title);
        setCart(updatedCart);

        try {
            await axios.post('/api/cart/remove', {
                userId: user.id,
                title
            });
        } catch (error) {
            console.error('Remove from cart failed:', error);
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            showNotification("Please sign in to checkout.");
            return;
        }

        if (cart.length === 0) {
            showNotification("Your cart is empty.");
            return;
        }

        try {
            const response = await axios.post('/api/checkout', {
                userId: user.id,
                cart,
            });

            if (response.data.success) {
                setCart([]); // Clear local cart
                showNotification("Checkout complete!");
            } else {
                showNotification("Checkout failed.");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            showNotification("Something went wrong.");
        }
    };

    const handleClearCart = () => {
        setCart([]);
        showNotification("Cart cleared!");
    };



    // Calculate total price and quantity
    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Tax & Shipping
    const taxRate = 0.08;
    const shippingFee = totalPrice > 50 ? 0 : 4.99;

    const tax = totalPrice * taxRate;
    const grandTotal = totalPrice + tax + shippingFee;

    return (
        <ValueContext.Provider value={{
            products,
            cart,
            handleAddToCart,
            handleRemoveFromCart,
            handleCheckout,
            handleClearCart,

            totalPrice,
            totalItems,
            shippingFee,
            tax,
            grandTotal
        }}>
            {children}
            <div className={clsx(notification ? "translate-x-0 scale-100" : 'translate-x-full scale-0', "transition-transform fixed bottom-4 right-4 shadow px-4 py-2 text-indigo-400 border border-neutral-900 bg-[#0e0d0d] rounded")}>
                {notification}
            </div>
        </ValueContext.Provider>
    );
};


export const useValue = () => {
    const context = useContext(ValueContext);
    if (!context) throw new Error('useValue must be used within a ValueProvider');
    return context;
};