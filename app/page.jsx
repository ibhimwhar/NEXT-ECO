'use client';
import { useValue } from '@/component/Context';
import ProductCard from '@/component/ProductCard';
import ToastHover from '@/component/ToastHover';
import {
  Phone,
  Search,
  FileText,
  Zap,
  Palette,
  Rocket,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const { products } = useValue();
  const [featuredProducts, setfeaturedProducts] = useState([]);

  // Featured products logic
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(pd => products.indexOf(pd) < 6);
      setfeaturedProducts(filtered)
    }
  }, [products])

  return (
    <div className="space-y-24 pb-24">

      {/* Hero Section */}
      <div className="text-center px-4 pt-12">
        <h1 className="text-5xl font-bold text-white">
          Shop Unlimited Products
        </h1>
        <p className="mt-4 text-neutral-400 max-w-2xl mx-auto text-base">
          Discover a seamless shopping experience with our wide range of high-quality products tailored to your needs.
        </p>
        <p className="mt-2 text-neutral-400 max-w-2xl mx-auto text-base">
          Whether you're here for essentials or something special, we've got you covered — fast, easy, and reliable.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <ToastHover message="Products">
            <Link href={'/products'}>
              <button className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-colors px-5 py-2 text-sm rounded text-white">
                Start Shopping
              </button>
            </Link>
          </ToastHover>
          <ToastHover message="Developer">
            <Link target="_blank" href="https://github.com/ibhimwhar">
              <button className="border border-neutral-900 px-5 py-2 cursor-pointer text-sm rounded text-white hover:ring-2 ring-indigo-600 transition-all">
                Learn more
              </button>
            </Link>
          </ToastHover>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-[#101010] space-y-24 py-20 px-4 md:px-16 rounded">

        {/* Explore Solutions Section */}
        <section>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Explore the solutions</h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto text-sm">
              From curated collections to personalized suggestions, we offer unique solutions for shoppers and creators alike.
            </p>
            <p className="mt-2 text-neutral-400 max-w-xl mx-auto text-sm">
              Experience the smart way to shop.
            </p>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-start gap-8">
            <div className="grid gap-6 w-full md:w-1/2">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-[#0a0a0a] p-6 rounded-lg w-full">
                  <h3 className="text-xl font-medium text-white">Simple Shopping Ecosystem</h3>
                  <p className="mt-2 text-neutral-400 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sit culpa distinctio.
                  </p>
                </div>
              ))}
            </div>

            <div className="sticky top-[13vh] w-full md:w-1/2">
              <Image
                src="/bruno-kelzer-LvySG1hvuzI-unsplash.jpg"
                width={500}
                height={500}
                alt="Product Showcase"
                className="rounded object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

        </section>

        {/* Feature Highlights Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-white">Why Shop With Us</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: 'Speedy Delivery',
                desc: (
                  <>
                    <p>Get your products fast with our reliable delivery network.</p>
                    <p className="mt-2">We ensure timely arrival and real-time tracking for a stress-free experience.</p>
                  </>
                )
              },
              {
                title: 'Top Quality',
                desc: (
                  <>
                    <p>We only stock high-quality items that you'll love and trust.</p>
                    <p className="mt-2">Every item is vetted for durability and design excellence.</p>
                  </>
                )
              },
              {
                title: 'Secure Checkout',
                desc: (
                  <>
                    <p>Shop safely with secure payment and customer protection.</p>
                    <p className="mt-2">Your privacy and data security are our top priorities.</p>
                  </>
                )
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                <div className="text-neutral-400 mt-2 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-white">How It Works</h2>
          <p className="text-center mt-2 text-neutral-400 text-sm max-w-xl mx-auto">
            Shopping with us is simple and smooth. Here's what to expect at each stage of your journey.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { title: 'Initial Contact', icon: <Phone size={20} />, desc: 'Reach out or sign up to browse our curated collections.' },
              { title: 'Discovery Session', icon: <Search size={20} />, desc: 'We suggest personalized picks tailored to your needs.' },
              { title: 'Contracting', icon: <FileText size={20} />, desc: 'Place your order securely through our trusted checkout system.' },
              { title: 'Fast Prototyping', icon: <Zap size={20} />, desc: 'We quickly pack your items and prepare them for shipping.' },
              { title: 'Design Phase', icon: <Palette size={20} />, desc: 'Enjoy optional custom packaging or product personalization.' },
              { title: 'Launch & Sale', icon: <Rocket size={20} />, desc: 'Track your shipment and enjoy your products at your doorstep!' },
            ].map((step, i) => (
              <div key={i} className="bg-[#0a0a0a] relative p-6 pt-12 rounded-lg text-center">
                <div className="flex items-center justify-center text-white absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-indigo-700 rounded-full w-10 h-10 shadow-md">
                  {step.icon}
                </div>
                <h4 className="text-white font-medium text-base mt-2">{step.title}</h4>
                <p className="text-neutral-400 text-sm mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted by Brands */}
        <section className="text-center">
          <p className="text-neutral-500 text-sm uppercase tracking-wider mb-4">
            Trusted by over 20,000 companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
            {['facebook', 'tinder', 'airbnb', 'hubspot', 'amazon'].map((brand, i) => (
              <span key={i} className="text-white text-lg font-bold capitalize">
                {brand}
              </span>
            ))}
          </div>
        </section>

      </div>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl font-semibold text-center text-white">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {[
            {
              name: 'Jasmine A.',
              text: 'Absolutely love the fast delivery and product quality. Shopping here is a breeze!',
            },
            {
              name: 'Leon T.',
              text: 'The experience felt premium. Checkout was smooth and support was helpful.',
            }
          ].map((review, i) => (
            <div key={i} className="bg-[#0a0a0a] p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-indigo-500">
                <Quote size={18} />
                <span className="text-white font-semibold">{review.name}</span>
              </div>
              <p className="text-sm text-neutral-400">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="pb-6 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>


      {/* CTA Section */}
      <section className="text-center px-6">
        <h3 className="text-white text-xl font-semibold">Still thinking?</h3>
        <p className="text-neutral-400 mt-2 text-sm">
          Join thousands of satisfied customers and discover a better way to shop.
        </p>
        <ToastHover message="Products">
          <Link href={'/products'}>
            <button className="mt-4 cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-colors px-5 py-2 text-sm rounded text-white">
              Browse All Products
            </button>
          </Link>
        </ToastHover>
      </section>

    </div>
  );
};

export default HomePage;