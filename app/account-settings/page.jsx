'use client';
import ToastHover from '@/component/ToastHover';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Eye, EyeClosed, Unplug } from 'lucide-react';
import React, { useState } from 'react';

const AccountSettingsPage = () => {
    const { user, isLoaded } = useUser();
    const [hidden, setHidden] = useState(false);

    if (!isLoaded) {
        return <div className="text-white p-6">Loading account info...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <div className='grid md:flex gap-4'>
                <div className="grid gap-6 place-content-between bg-[#101010] border border-neutral-900 rounded p-4">
                    <img
                        src={user.imageUrl}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full p-1 border border-neutral-900"
                    />
                    <SignOutButton>
                        <button
                            className="w-full text-sm bg-[#0a0a0a] border border-neutral-900 p-2 text-red-500 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700"
                        >
                            <ToastHover message="Sign Out">
                                Sign out
                            </ToastHover>
                        </button>
                    </SignOutButton>
                </div>
                <div className="flex-1 bg-[#101010] border border-neutral-900 rounded p-4 space-y-4">
                    <div>
                        <p className="text-sm text-neutral-500">Full Name</p>
                        <h2 className="text-lg font-medium">{user.firstName} {user.lastName}</h2>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">Email Address</p>
                        <h2 className="text-lg font-medium">{user.primaryEmailAddress?.emailAddress}</h2>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">User ID</p>
                        <div className='flex justify-between items-center gap-6'>
                            <h2 className="text-lg font-medium break-all">
                                {hidden ? user.id : '*'.repeat(user.id.length)}
                            </h2>
                            <button
                                onClick={() => setHidden(prev => !prev)}
                                className="bg-[#0a0a0a] border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700"
                            >
                                {hidden === false ? <EyeClosed size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">Account Created</p>
                        <h2 className="text-lg font-medium">
                            {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString()}
                        </h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AccountSettingsPage;
