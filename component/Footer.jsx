import { ChevronUp, Dot, Github, Send } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ToastHover from "./ToastHover";
import { SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Footer = () => {
  const { isSignedIn } = useUser();
  const [email, setEmail] = useState('');

  function handleSubmit() {
    setEmail('');
  };

  return (
    <footer className="border-t border-neutral-900 px-8 py-10 max-w-3xl mx-auto text-sm">

      <div className="flex flex-wrap gap-10">
        {/* Logo Section */}
        <div>
          <h1 className="font-bold text-lg text-white">
            NEXT-<span className="border-b-2 border-indigo-700">ECO</span>
          </h1>
          <p className="mt-2 max-w-sm text-neutral-500">
            Premium quality fashion delivered to your door. Crafted for style and comfort.
          </p>

          <div className='mt-4 flex border border-neutral-900 p-2 rounded cursor-pointer transition-all focus-within:ring hover:ring-2 ring-indigo-700'>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="outline-none w-full mr-2 placeholder:text-neutral-500"
            />
            <button onClick={handleSubmit} className="border-l border-neutral-900 pl-2 cursor-pointer transition-colors hover:text-indigo-500">
              <Send />
            </button>
          </div>

        </div>

        {/* Link Sections */}
        <div className="flex gap-12 md:gap-6 text-neutral-500">
          <div>
            <h2 className="font-semibold text-white mb-3">Products</h2>
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
          </div>

          <div>
            <h2 className="font-semibold text-white mb-3">Company</h2>
            <ul className="grid gap-2">
              {[
                { title: "about", link: '#' },
                { title: "career", link: '#' },
                { title: "contact", link: '#' },
              ].map((_, idx) => (
                <Link key={idx} href={_.link}>
                  <li className="transition-colors hover:text-white cursor-pointer capitalize">{_.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full sm:w-fit md:grid content-between">
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

          <ToastHover message="Scroll to top">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='border border-neutral-900 p-2 rounded cursor-pointer transition-all hover:ring-2 ring-indigo-700'
            >
              <ChevronUp size={20} />
            </button>
          </ToastHover>

        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-xs text-neutral-500 border-t border-neutral-800 pt-6 text-center">
        &copy; {new Date().getFullYear()} NEXT-ECO. All rights reserved.
      </div>

      <div className="flex items-center mt-4 text-neutral-500">
        <Link href={'#'}>
          <p className="text-[12px] transition-colors hover:underline underline-offset-2 hover:text-white cursor-pointer">Terms</p>
        </Link>
        <Dot />
        <Link href={'#'}>
          <p className="text-[12px] transition-colors hover:underline underline-offset-2 hover:text-white cursor-pointer">Privacy Policy</p>
        </Link>
        <Dot />
        {!isSignedIn ? (
          <SignedOut>
            <SignInButton mode='modal'>
              <p className="text-[12px] transition-colors hover:underline underline-offset-2 hover:text-white cursor-pointer">Sign In</p>
            </SignInButton>
          </SignedOut>
        ) : (<SignOutButton>
          <p className="text-[12px] transition-colors hover:underline underline-offset-2 hover:text-white cursor-pointer">Sign Out</p>
        </SignOutButton>)}
      </div>

    </footer>
  );
};

export default Footer;