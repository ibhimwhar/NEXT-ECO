'use client';
import { useValue } from '@/component/Context';
import ProductCard from '@/component/ProductCard';
import ToastHover from '@/component/ToastHover';
import clsx from 'clsx';
import { Github, LayoutList, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const ProductPage = () => {
    const { products } = useValue();

    const [opencategories, setOpenCategories] = useState(true);
    const categoriesRef = useRef(null)

    const [filteredproducts, setFilteredProducts] = useState(products);
    const [searchterm, setSearchTerm] = useState('');


    const searchParams = useSearchParams();
    const itemQuery = searchParams.get('item');

    const [selectedCategory, setSelectedCategory] = useState(itemQuery || '');

    useEffect(() => {
        const filtered = products.filter(pd => pd.title.toLowerCase().includes(searchterm.toLowerCase()));
        setFilteredProducts(filtered);
    }, [products, searchterm]);

    useEffect(() => {
        const OutSideClick = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                setOpenCategories(false);
            }
        }
        document.addEventListener("mousedown", OutSideClick);
        return () => document.removeEventListener("mousedown", OutSideClick);
    }, [])

    useEffect(() => {
        const filtered = products.filter(pd =>
            pd.title.toLowerCase().includes(searchterm.toLowerCase()) &&
            (selectedCategory ? pd.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    }, [products, searchterm, selectedCategory]);

    useEffect(() => {
        if (itemQuery) {
            setSelectedCategory(itemQuery);
        }
    }, [itemQuery]);



    return (
        <div className="px-6 lg:px-0 pb-24">


            <h1 className="text-3xl mb-6 sm:mb-0 text-white font-semibold">Explore Products</h1>

            <div className='flex flex-1 border border-neutral-900 p-2 rounded cursor-pointer transition-all focus-within:ring hover:ring-2 ring-indigo-700'>
                <span className="border-r border-neutral-900 pr-2">
                    <Search />
                </span>
                <input
                    type="text"
                    value={searchterm}
                    onChange={(event) => {
                        const value = event.target.value;
                        if (value.length <= 26) {
                            setSearchTerm(value);
                        }
                    }}
                    placeholder="Search products..."
                    className="outline-none w-full ml-2 placeholder:text-neutral-500"
                />
            </div>

            {filteredproducts.length === 0 ? (
                <div className="w-full max-w-xl">
                    <p className="text-neutral-500 text-sm mt-6 break-words">
                        No items found for your search:
                        <span className="text-white font-semibold ml-1 break-all">
                            '{searchterm.toUpperCase()}'
                        </span>
                    </p>
                </div>
            ) : (
                <div className='flex flex-col-reverse md:flex-row gap-4'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {filteredproducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <aside className='sm:sticky top-18 pt-4 min-w-fit md:w-50 h-fit'>
                        <button onClick={() => setOpenCategories(!opencategories)} className={clsx(opencategories ? 'hidden' : '', 'border border-neutral-900 bg-[#0a0a0a] p-2 rounded cursor-pointer transition-all focus:ring-2 ring-indigo-700')}>
                            <LayoutList />
                        </button>
                        <div ref={categoriesRef} className={clsx(opencategories ? 'translate-x-0' : '-translate-x-full md:translate-x-full scale-0 h-0 w-0', 'transition-transform')}>
                            <div className='border border-neutral-900 p-4 bg-[#0a0a0a] rounded'>
                                <h2 className='text-white text-lg font-semibold flex items-center gap-2'>
                                    <LayoutList /> Categories
                                </h2>
                                <ul className='mt-4 text-neutral-500 text-sm space-y-2'>
                                    <ul className="grid gap-2">
                                        {[
                                            { title: "men's clothing" },
                                            { title: "jewelery" },
                                            { title: "electronics" },
                                            { title: "women's clothing" },
                                        ].map((_, idx) => (
                                            <Link key={idx} href={`/products?item=${encodeURIComponent(_.title)}`}>
                                                <li className="transition-colors hover:text-white cursor-pointer capitalize">{_.title}</li>
                                            </Link>
                                        ))}
                                    </ul>

                                    <li
                                        onClick={() => setSelectedCategory('')}
                                        className={clsx(
                                            'transition-colors hover:text-white cursor-pointer mt-4',
                                            selectedCategory === '' && 'text-indigo-400'
                                        )}
                                    >
                                        Show All
                                    </li>
                                </ul>
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

                    </aside>

                </div>
            )}

        </div>
    );
};

export default ProductPage;
