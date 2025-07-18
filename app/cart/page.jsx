'use client';
import { useValue } from '@/component/Context'
import ToastHover from '@/component/ToastHover';
import { Github, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const page = () => {
    const { cart,
        handleRemoveFromCart,
        handleCheckout,
        totalPrice,
        totalItems,
        shippingFee,
        tax,
        grandTotal
    } = useValue();


    if (cart.length === 0) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center text-neutral-400 text-sm mt-6">
                <p>Your cart is empty</p>
                <ShoppingBag size={100} />
            </div>
        )
    }

    return (
        <div className='grid gap-6 md:flex pb-12'>
            <div className="px-2 grid gap-6 w-full">
                {cart.length > 0 && (
                    cart.map((item, i) => (
                        <div
                            key={i}
                            className="border border-neutral-900 p-2 rounded flex items-center justify-between gap-3 bg-[#101010]"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1 text-sm font-medium text-white">
                                <h2 className='mb-2'>{item.title}</h2>
                                <p className='text-neutral-500'>Price: ${item.price.toFixed(2)}</p>
                            </div>

                            <ToastHover message="Remove">
                                <button
                                    onClick={() => handleRemoveFromCart(item.title)}
                                    className="bg-[#0a0a0a] border border-neutral-900 p-2 text-red-500 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </ToastHover>
                        </div>
                    ))
                )}
            </div>

            {/* Cart Summary */}
            <div className="sticky top-26 min-w-[300px] space-y-4 mx-2">
                <div className='border border-neutral-900 rounded bg-[#101010] p-6'>
                    <h2 className="text-white text-xl font-semibold mb-4">Cart Summary</h2>

                    <div className="text-neutral-500 text-sm mb-2 flex justify-between">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className="text-neutral-500 text-sm mb-2 flex justify-between">
                        <span>Subtotal:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="text-neutral-500 text-sm mb-2 flex justify-between">
                        <span>Tax (8%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="text-neutral-500 text-sm mb-4 flex justify-between">
                        <span>Shipping:</span>
                        <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                    </div>

                    <div className="text-white text-lg font-semibold mb-6 flex justify-between">
                        <span>Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-colors w-full px-5 py-2 text-sm rounded text-white"
                    >
                        Checkout
                    </button>
                </div>
                <div className='cursor-pointer border border-neutral-900 p-1 bg-[#0a0a0a] rounded mt-4'>
                    <ToastHover message="Developer">
                        <Link
                            target='_blank'
                            href="https://github.com/ibhimwhar"
                        >
                            <button
                                className='border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700'
                            >
                                <Github size={20} />
                            </button>
                        </Link>
                    </ToastHover>
                </div>
            </div>

        </div>
    )
}

export default page