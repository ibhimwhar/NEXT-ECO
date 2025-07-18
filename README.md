# NEXT-ECO – Full-Stack E-Commerce Web App

NEXT-ECO is a modern, production-grade full-stack **e-commerce platform** built using **Next.js 14 App Router**, **MongoDB**, **Clerk authentication**, **Tailwind CSS v4**, and **TypeScript**. It includes complete cart functionality, user authentication, and a secure admin dashboard to manage products.

---

## Preview

![Homepage](https://via.placeholder.com/1200x600.png?text=NEXT-ECO+Homepage)
![Product Page](https://via.placeholder.com/1200x600.png?text=Product+Details)
![Cart Page](https://via.placeholder.com/1200x600.png?text=Cart+Page)
![Admin Dashboard](https://via.placeholder.com/1200x600.png?text=Admin+Dashboard)

---

## Features

- **Clerk Authentication** (Sign Up, Sign In, Sign Out)
- **Product Browsing** with categories, brands, and details
- **Cart System** with quantity control (MongoDB synced)
- **Order Handling** (extendable for future payment integration)
- **Admin Dashboard** to manage products
- **Dark Mode** (Toggle with smooth UI)
- **Next.js API Routes** for backend logic
- **MongoDB Database** for products, users, and carts
- **Responsive Design** built with Tailwind CSS v4
- **Vercel Deployment Ready**

---

## Tech Stack

| Layer      | Stack                                     |
|------------|-------------------------------------------|
| Frontend   | React, Next.js 14 App Router, Tailwind CSS|
| Backend    | Next.js API Routes (serverless functions) |
| Auth       | Clerk.dev                                 |
| Database   | MongoDB + Mongoose                        |
| Hosting    | Vercel                                     |

---

## Installation

### 1. Clone the Repo

```bash
git clone https://github.com/ibhimwhar/NEXT-ECO.git
cd NEXT-ECO

npm install
```

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexteco

# Clerk (get values from Clerk dashboard)
CLERK_SECRET_KEY=your_secret_key
CLERK_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable

# Optional Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


```bash
NEXT-ECO/
├── app/                -- App Router pages & routes
│   ├── layout.tsx
│   ├── page.tsx        -- Homepage
│   ├── product/[id]/   -- Dynamic product pages
│   ├── cart/           -- Cart page
│   ├── admin/          -- Admin dashboard
│   └── api/            -- API routes (cart, products)
├── components/         -- Reusable UI components
├── lib/                -- Database and utility helpers
├── public/             -- Static files
├── styles/             -- Tailwind config & global CSS
├── .env                -- Env vars (not committed)
├── next.config.mjs
└── README.md
```

```bash
{
  "userId": "user_123",
  "productId": "prod_456",
  "quantity": 2
}
