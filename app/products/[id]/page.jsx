'use client';
import { useValue } from '@/component/Context';
import ToastHover from '@/component/ToastHover';
import { Github, Minus, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const ViewProductPage = () => {
    const [zoomed, setZoomed] = useState(0);
    const { products, cart, handleAddToCart, handleRemoveFromCart } = useValue();
    const { title } = useParams();

    const decodedTitle = decodeURIComponent(title);
    const product = products.find((pd) => pd.title === decodedTitle);

    if (!product) return <div className="text-white p-6">Product not found.</div>;

    const isInCart = cart.some((item) => item.title === product.title);

    const handleZoom = (direction) => {
        setZoomed((prev) => Math.min(Math.max(prev + direction, 0), 10));
    };

    const zoomedImageStyle = {
        transform: `scale(${1 + zoomed * 0.1})`,
        transition: 'transform 0.3s ease',
    };

    // UPDATE
    if (!products.length) return <div>Loading products...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 mb-6 border border-neutral-900 rounded bg-[#101010] text-white">
            {/* Product Image */}
            <div className="flex flex-col items-center md:w-1/2">
                <div className="bg-white w-full rounded overflow-hidden">
                    <img
                        style={zoomedImageStyle}
                        src={product.image}
                        alt={`${product.title} image`}
                        className="w-full h-72 md:h-[28rem] object-cover"
                    />
                </div>

                <div className="flex gap-6 mt-4">
                    <button
                        onClick={() => handleZoom(-1)}
                        className="p-1 text-indigo-400 border border-neutral-900 bg-[#0e0d0d] hover:bg-[#161616] cursor-pointer rounded-full"
                    >
                        <Minus size={18} />
                    </button>
                    <button
                        onClick={() => handleZoom(1)}
                        className="p-1 text-indigo-400 border border-neutral-900 bg-[#0e0d0d] hover:bg-[#161616] cursor-pointer rounded-full"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">{product.title}</h2>

                <div className="flex items-center gap-2 text-yellow-300 text-sm">
                    <span>{product.rating?.rate}</span>
                    <span>({product.rating?.count})</span>
                    {product.rating &&
                        Array.from({ length: Math.round(product.rating.rate) }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-yellow-300 stroke-yellow-300" />
                        ))}
                </div>

                <p className="text-neutral-400 text-sm">{product.description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-indigo-400 border border-neutral-900 bg-[#0e0d0d] py-2 px-4 rounded-full">
                        {product.category}
                    </span>
                    <h3 className="text-3xl font-bold">${product.price.toFixed(2)}</h3>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3 flex-wrap">
                    {isInCart ? (
                        <>
                            <ToastHover message="Remove from cart">
                                <button
                                    onClick={() => handleRemoveFromCart(product.title)}
                                    className="flex-1 text-red-500 px-4 py-2 cursor-pointer text-sm rounded border border-neutral-900 hover:ring-2 ring-indigo-700 transition-all"
                                >
                                    Remove from cart
                                </button>
                            </ToastHover>

                            <ToastHover message="Developer">
                                <Link target="_blank" href="https://github.com/ibhimwhar">
                                    <button className="border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700">
                                        <Github size={20} />
                                    </button>
                                </Link>
                            </ToastHover>
                        </>
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
        </div>
    );
};

export default ViewProductPage;