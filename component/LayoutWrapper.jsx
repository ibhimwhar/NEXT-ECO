'use client';
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useValue } from "./Context";

export default function LayoutWrapper({ children }) {
    const { isLoaded } = useUser();
    const [openAccount, setOpenAccount] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const { products } = useValue();

    const accountRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setOpenAccount(false);
            }

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isLoaded || !products) {
        return (
            <div className="min-h-screen flex items-center justify-center space-x-4">
                <span className="animate-spin">
                    <LoaderCircle />
                </span>
                <span className="text-lg font-medium select-none">
                    Loading...
                </span>
            </div>
        );
    }

    return (
        <>
            <Header
                openAccount={openAccount}
                setOpenAccount={setOpenAccount}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                accountRef={accountRef}
                menuRef={menuRef}
            />

            <div className="relative bottom-0 top-0">
                {(openAccount || openMenu) && (
                    <span className="absolute z-40 bg-black/5 backdrop-blur-xs inset-0" />
                )}
                <main className="max-w-5xl mx-auto mt-[22vh] min-h-screen">
                    {children}
                </main>
            </div>

            <Footer />
        </>
    );
}