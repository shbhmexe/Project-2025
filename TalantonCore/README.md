# E-Commerce Product Catalog - Next.js Assignment

A full-featured e-commerce product catalog built with Next.js 15, TypeScript, and Tailwind CSS, demonstrating different rendering strategies (SSG, ISR, SSR, CSR) in the modern App Router architecture.

## 🚀 Features

- **Product Catalog** - Browse products with search and category filtering
- **Product Details** - View individual product information with ISR
- **Inventory Dashboard** - Real-time inventory statistics with SSR
- **Admin Panel** - Manage products with client-side rendering
- **API Routes** - RESTful API for product operations
- **Authentication** - API key-based authentication for admin operations
- **TypeScript** - Fully typed codebase for better development experience
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ecommerce-catalog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   
   The default API key is `admin-secret-key-123`. You can customize it in the `.env` file:
   ```
   ADMIN_API_KEY=your-custom-api-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
ecommerce-catalog/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET & POST /api/products
│   │       └── [slug]/
│   │           └── route.ts          # GET & PUT /api/products/[slug]
│   ├── admin/
│   │   └── page.tsx                  # Admin panel (CSR)
│   ├── dashboard/
│   │   └── page.tsx                  # Inventory dashboard (SSR)
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx              # Product details (ISR)
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page (SSG)
├── components/
│   └── ProductList.tsx               # Client component for product filtering
├── lib/
│   ├── db.ts                         # Database utility functions
│   └── auth.ts                       # Authentication middleware
├── data/
│   └── products.json                 # Mock database
└── README.md
```

## 🎯 Pages & Rendering Strategies

### 1. Home Page (`/`)
**Rendering Strategy:** Static Site Generation (SSG)

- **Why:** Product listings are relatively stable and benefit from being pre-generated at build time for optimal performance
- **Implementation:** Uses default Next.js behavior with async Server Component
- **Features:**
  - Displays all products in a grid layout
  - Client-side search functionality
  - Category filtering
  - Links to product detail pages

### 2. Product Detail Page (`/products/[slug]`)
**Rendering Strategy:** Incremental Static Regeneration (ISR)

- **Why:** Balances performance with data freshness - pages are statically generated but can update without full rebuild
- **Implementation:** `export const revalidate = 60` (revalidates every 60 seconds)
- **Features:**
  - Pre-generates all product pages at build time using `generateStaticParams()`
  - Automatically regenerates stale pages in the background
  - Shows product details, pricing, inventory status
  - Perfect for dynamic data like stock levels and prices

### 3. Inventory Dashboard (`/dashboard`)
**Rendering Strategy:** Server-Side Rendering (SSR)

- **Why:** Requires always-fresh data for accurate inventory tracking and statistics
- **Implementation:** `export const dynamic = 'force-dynamic'`
- **Features:**
  - Real-time inventory statistics
  - Low stock alerts
  - Out of stock tracking
  - Category breakdown with values
  - Rendered fresh on every request

### 4. Admin Panel (`/admin`)
**Rendering Strategy:** Client-Side Rendering (CSR)

- **Why:** Highly interactive page with forms, state management, and API interactions
- **Implementation:** `'use client'` directive with React hooks
- **Features:**
  - API key authentication (stored in sessionStorage)
  - Add new products via form
  - Edit existing products
  - Client-side data fetching from API
  - Real-time form validation

## 🔌 API Routes

### GET `/api/products`
Fetch all products (no authentication required)

### GET `/api/products/[slug]`
Fetch a single product by slug (no authentication required)

### POST `/api/products`
Create a new product (requires `x-api-key` header)

**Request body:**
```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "description": "Product description",
  "price": 99.99,
  "category": "Category",
  "inventory": 50
}
```

### PUT `/api/products/[slug]`
Update an existing product (requires `x-api-key` header)

**Request body:** Any subset of product fields to update

## 🔐 Authentication

Admin routes (POST, PUT) are protected with API key authentication:

1. **Login to Admin Panel:**
   - Navigate to `/admin`
   - Enter API key: `admin-secret-key-123` (default)
   - Key is stored in sessionStorage for the session

2. **API Authentication:**
   - Include header: `x-api-key: admin-secret-key-123`
   - Used by admin panel automatically after login

## 🗄️ Mock Database

The application uses a JSON file (`data/products.json`) as a mock database:

- **Location:** `data/products.json`
- **Format:** Array of product objects
- **Operations:** Read and write operations through `lib/db.ts`
- **Persistence:** Changes persist across server restarts

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** JSON file (mock database)
- **Deployment Ready:** Vercel, Netlify, or any Node.js hosting

## 🚦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📊 Data Flow

```
Frontend Pages
    ↓
Server Components (SSG/ISR/SSR)
    ↓
Database Utility (lib/db.ts)
    ↓
JSON File (data/products.json)

Admin Panel (CSR)
    ↓
API Routes (app/api/products)
    ↓
Auth Middleware (lib/auth.ts)
    ↓
Database Utility (lib/db.ts)
    ↓
JSON File (data/products.json)
```

## 🎓 Learning Outcomes Demonstrated

1. **SSG (Static Site Generation)** - Home page pre-generated at build time
2. **ISR (Incremental Static Regeneration)** - Product pages with periodic updates
3. **SSR (Server-Side Rendering)** - Dashboard with fresh data on every request
4. **CSR (Client-Side Rendering)** - Interactive admin panel with React hooks
5. **API Routes** - RESTful backend with Next.js
6. **Authentication** - API key-based protection
7. **TypeScript** - Type-safe development
8. **Modern App Router** - Latest Next.js patterns and best practices

## 🎯 Key Differences Between Rendering Strategies

| Strategy | When Generated | Data Freshness | Use Case |
|----------|---------------|----------------|----------|
| SSG | Build time | Static | Product listings, marketing pages |
| ISR | Build time + periodic updates | Semi-fresh | Product details, blog posts |
| SSR | Every request | Always fresh | Dashboards, user profiles |
| CSR | Client-side | Depends on fetch | Interactive forms, admin panels |

## 📝 Notes

- The project uses Next.js App Router (not Pages Router)
- All pages use TypeScript for type safety
- Tailwind CSS provides responsive, utility-first styling
- The mock database persists changes during development
- API authentication is simplified for demonstration purposes

## 🔧 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or run on different port
npm run dev -- -p 3001
```

**Dependencies issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is for educational purposes as part of a Next.js assignment.

---

**Author:** Shubham  
**Date:** October 2025  
**Assignment:** Next.js Rendering Strategies & E-Commerce Catalog
