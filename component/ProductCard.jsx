'use client';
import { Github, Star, Trash2 } from 'lucide-react'
import React from 'react'
import ToastHover from './ToastHover'
import Link from 'next/link'
import { useValue } from './Context'

const ProductCard = ({ product }) => {
    const { handleAddToCart, cart, handleRemoveFromCart } = useValue();
    const isInCart = cart.some(item => item.title === product.title);

    return (
        <div
            key={product.id}
            className="flex flex-col justify-between border border-neutral-900 rounded p-4 bg-[#0a0a0a] text-white"
        >
            <img
                src={product.image}
                alt={`${product.title} image`}
                className="rounded object-center w-full h-60 hover:object-cover transition-all duration-300"
            />

            <h2 className="font-medium mt-4">{product.title}</h2>

            <div className="w-full flex justify-end items-center gap-1 mt-3 text-yellow-300 text-sm">
                <span className='text-[10px]'>{product.rating?.rate}</span>
                <span className='text-[10px]'>({product.rating?.count})</span>
                {product.rating && Array.from({ length: Math.round(product.rating.rate) }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-300 stroke-yellow-300" />
                ))}
            </div>

            <p className="text-neutral-500 text-sm my-4">
                {product.description.slice(0, 20)}...
                <Link href={`/products/${encodeURIComponent(product.title)}`}>
                    <span className="transition-colors hover:text-white cursor-pointer ml-3">Read More</span>
                </Link>
            </p>

            <div className='flex items-center justify-between'>
                <span className="text-[11px] text-indigo-400 border border-neutral-900 bg-[#0e0d0d] py-2 px-4 rounded-full">{product.category}</span>
                <h3 className='text-4xl font-bold'>${product.price.toFixed(2)}</h3>
            </div>

            <div className="mt-6 gap-4 grid">
                <ToastHover message="View product details">
                    <Link href={`/products/${encodeURIComponent(product.title)}`} className="flex-1">
                        <button className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-colors px-5 py-2 text-sm rounded text-white">
                            View
                        </button>
                    </Link>
                </ToastHover>

                {isInCart ? (
                    <div className="flex gap-2">
                        <ToastHover message="Remove from cart">
                            <button
                                onClick={() => handleRemoveFromCart(product.title)}
                                className="w-full text-red-500 px-4 py-2 cursor-pointer text-sm rounded border border-neutral-900 hover:ring-2 ring-indigo-600 transition-all"
                            >
                                Remove from cart
                            </button>
                        </ToastHover>
                        <ToastHover message="Developer">
                            <Link
                                target='_blank'
                                href="https://github.com/ibhimwhar"
                            >
                                <button
                                    className='w-full border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700'
                                >
                                    <Github size={20} />
                                </button>
                            </Link>
                        </ToastHover>
                    </div>
                ) : (
                    <ToastHover message="Add to cart">
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full cursor-pointer border border-neutral-900 px-5 py-2 text-sm rounded text-white hover:ring-2 ring-indigo-600 transition-all"
                        >
                            Add to cart
                        </button>
                    </ToastHover>
                )}
            </div>

        </div>
    )
}

export default ProductCard