'use client';
import { Github, Menu, Settings, ShoppingBag, ShoppingBasket, ShoppingCart, Trash2, Unplug, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    useUser,
} from '@clerk/nextjs'
import clsx from 'clsx';
import ToastHover from './ToastHover';
import { useValue } from './Context';

const Header = ({ openAccount, setOpenAccount, openMenu, setOpenMenu, menuRef, accountRef }) => {
    const { isSignedIn, user } = useUser();
    const { cart,
        totalPrice,
        totalItems,
        shippingFee,
        tax,
        grandTotal,
        handleCheckout,
        handleClearCart
    } = useValue();


    return (
        <header className='fixed bg-[#0a0a0a] shadow-2xl shadow-[#0a0a0a] z-50 top-0 w-full border-b border-neutral-900 p-4 lg:px-[60px] flex justify-between items-center'>

            <ToastHover message="Go back home">
                <Link href="/">
                    <h1 className="font-bold text-2xl cursor-pointer">
                        NEXT-<span className="border-b-2 border-indigo-700">ECO</span>
                    </h1>
                </Link>
            </ToastHover>

            <nav className='flex gap-5 items-center'>

                {!isSignedIn && (
                    <SignedOut>
                        <SignInButton mode='modal'>
                            <span className='text-sm transition-colors text-neutral-500 hover:text-white cursor-pointer animate-pulse'>Sign In</span>
                        </SignInButton>
                    </SignedOut>
                )}

                <ToastHover message="Menu">
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className='block sm:hidden border border-neutral-900 p-2 rounded cursor-pointer transition-all focus:ring-2 ring-indigo-700'
                    >
                        {openMenu ? <X size={20} /> : <Menu size={20} />}
                    </button>

                </ToastHover>

                <div className='hidden sm:flex gap-4 items-center'>
                    <ToastHover message="Products">
                        <Link
                            href="/products"
                        >
                            <button
                                className='border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700'
                            >
                                <ShoppingBasket size={20} />
                            </button>
                        </Link>
                    </ToastHover>

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

                    <div className='relative group'>
                        <ToastHover message="Cart">
                            <Link href={"/cart"}>
                                <button className='border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700'>
                                    <ShoppingCart size={20} />
                                    <span className="absolute -top-2 -right-2 bg-[#0a0a0a] border border-neutral-800 text-[10px] text-white rounded-full w-4 h-4 p-2 flex items-center justify-center">{cart.length}</span>
                                </button>
                            </Link>
                        </ToastHover>

                        <div
                            className={clsx(
                                'absolute right-0 top-9 pt-[7vh]',
                                'transition-all group-hover:scale-100 scale-0 z-50'
                            )}
                        >
                            <div className="w-[46vh] bg-[#0a0a0a] border border-neutral-900 rounded shadow-xl">
                                <h1 className="font-semibold text-xl text-right p-4 border-b border-neutral-900">
                                    Cart
                                </h1>

                                <div className="py-3 overflow-y-auto h-[36vh] space-y-2 px-2 relative">
                                    {!isSignedIn ? (
                                        <SignedOut>
                                            <SignInButton mode='modal'>
                                                <span className='absolute left-1/2 -translate-x-1/2 mt-6 text-sm transition-colors text-neutral-500 hover:text-white cursor-pointer'>Sign In</span>
                                            </SignInButton>
                                        </SignedOut>
                                    ) : (
                                        cart.length > 0 ? (
                                            cart.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="border border-neutral-900 p-2 rounded flex items-center justify-between gap-3 bg-[#101010]"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-14 h-14 object-cover rounded"
                                                    />

                                                    <h2 className="flex-1 text-sm font-medium text-white">{item.title}</h2>

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
                                        ) : (
                                            <div className="flex flex-col gap-4 justify-center items-center text-neutral-400 text-sm mt-6">
                                                <p>Your cart is empty</p>
                                                <ShoppingBag size={50} />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className='p-4 border-t border-neutral-900'>
                                    <p className="font-semibold text-sm mb-6 text-neutral-500">TOTAL: <span className='text-white'>$ {user ? grandTotal.toFixed(2) : '0.00'}</span></p>
                                    <button
                                        onClick={handleCheckout}
                                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-colors w-full px-5 py-2 text-sm rounded text-white"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {isSignedIn && (
                    <SignedIn>
                        {/* User profile image */}
                        <ToastHover message="Account">
                            {user?.imageUrl && (
                                <img
                                    onClick={() => setOpenAccount(!openAccount)}
                                    src={user.imageUrl}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full p-1 border border-neutral-900 cursor-pointer transition-all hover:ring-2 ring-indigo-700"
                                />
                            )}
                        </ToastHover>

                    </SignedIn>
                )}

            </nav>

            {/* Menu panel positioned top-right */}
            <div ref={menuRef} className={clsx(openMenu ? 'translate-x-0 m-6' : 'translate-x-full', 'transition-transform z-40 absolute right-0 top-[12vh]')}>

                <div className='w-[42vh] bg-[#0a0a0a] border border-neutral-900 rounded overflow-hidden'>

                    <div className='p-4'>
                        <div className='flex items-center justify-between gap-6 sm:gap-16'>
                            <h1 className="font-semibold">Menu</h1>

                            <ToastHover message="Close">
                                <button onClick={() => setOpenMenu(false)} className='cursor-pointer text-red-500 border border-neutral-900 p-2 rounded hover:ring-2 ring-indigo-700 transition-all'>
                                    <X size={18} />
                                </button>
                            </ToastHover>
                        </div>
                    </div>

                    {/* Menu Actions */}
                    <div className='grid gap-1 text-sm pb-6'>
                        <Link
                            href="/products"
                        >
                            <button className='cursor-pointer text-sm flex items-center gap-2 p-3 active:bg-neutral-900 transition-all w-full text-left'>
                                <ShoppingBasket size={20} />
                                Products
                            </button>
                        </Link>

                        <Link
                            target='_blank'
                            href="https://github.com/ibhimwhar"
                        >
                            <button className='cursor-pointer text-sm flex items-center gap-2 p-3 active:bg-neutral-900 transition-all w-full text-left'>
                                <Github size={20} />
                                Developer
                            </button>
                        </Link>

                        <Link href={"/cart"}>
                            <button className='cursor-pointer text-sm flex items-center gap-2 p-3 active:bg-neutral-900 transition-all w-full text-left'>
                                <ShoppingCart size={20} />
                                Cart {cart.length}
                            </button>
                        </Link>
                    </div>

                </div>
            </div>


            {/* User profile panel positioned top-right */}
            < div ref={accountRef} className={clsx(openAccount ? 'translate-x-0 m-6' : 'translate-x-full', 'transition-transform z-40 absolute right-0 top-[12vh]')} >

                <div className='w-full max-w-sm bg-[#0a0a0a] border border-neutral-900 rounded overflow-hidden'>

                    <div className='p-4'>
                        <div className='flex items-center justify-between gap-6 sm:gap-16'>
                            <div className='flex items-center gap-3'>
                                {/* Profile image with status dot */}
                                <div className='relative'>
                                    {user?.imageUrl && (
                                        <img
                                            src={user.imageUrl}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    )}
                                    <span className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border border-[#0a0a0a]' />
                                </div>

                                {/* Name & Email */}
                                <div>
                                    <h1 className="font-semibold text-sm">{user?.firstName}</h1>
                                    <p className="text-[10px] text-neutral-400">{user?.primaryEmailAddress?.emailAddress}</p>
                                </div>
                            </div>

                            <ToastHover message="Close">
                                <button onClick={() => setOpenAccount(false)} className='cursor-pointer text-red-500 border border-neutral-900 p-2 rounded hover:ring-2 ring-indigo-700 transition-all'>
                                    <X size={18} />
                                </button>
                            </ToastHover>
                        </div>
                    </div>

                    {/* Optional welcome text or role */}
                    <div className='p-4 border-y border-neutral-900'>
                        <p className='text-xs text-neutral-400'>
                            Welcome back
                        </p>
                    </div>

                    {/* Profile Actions */}
                    <div className='grid gap-1 text-sm'>

                        <SignOutButton>
                            <button onClick={() => setOpenAccount(false)} className='cursor-pointer flex items-center gap-2 p-3 hover:bg-neutral-900 transition-all w-full text-left'>
                                <Unplug size={18} />
                                Sign Out
                            </button>
                        </SignOutButton>

                        <button
                            onClick={() => {
                                handleClearCart();
                                setOpenAccount(false);
                            }}
                            className='cursor-pointer flex items-center gap-2 p-3 hover:bg-neutral-900 transition-all w-full text-left'
                        >
                            <Trash2 size={18} />
                            Clear Cart
                        </button>


                        {/* Account Settings */}
                        <Link href="/account-settings">
                            <button className='cursor-pointer flex items-center gap-2 p-3 hover:bg-neutral-900 transition-all w-full text-left'>
                                <Settings size={18} />
                                Account Settings
                            </button>
                        </Link>
                    </div>

                </div>

            </div>



        </header>
    )
}

export default Header