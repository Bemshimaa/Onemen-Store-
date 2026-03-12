# ONEMEN — Streetwear E-Commerce Store

**ONEMEN: One of None** — A premium streetwear clothing brand e-commerce store built for high performance and sleek aesthetics.

---

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React 19 + Vite 7                           |
| Styling  | Tailwind CSS v4 + Bebas Neue / Oswald fonts |
| State    | Redux Toolkit (cart + auth slices)          |
| Routing  | React Router DOM v7                         |
| Backend  | Node.js + Express 5                         |
| Database | MongoDB Atlas + Mongoose 9                  |
| Auth     | JWT + bcryptjs                              |
| Payment  | Paystack Integration                        |

---

## Getting Started

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Bemshimaa/Onemen-Store-.git
cd Onemen-Store-

# 2. Setup Backend
cd Backend
npm install
# Create a .env file with: MONGO_URI, JWT_SECRET, PAYSTACK_SECRET_KEY, PORT
npm run dev

# 3. Setup Frontend
cd ../ONEMEN
npm install
# Create a .env file with: VITE_API_URL=http://localhost:5000, VITE_PAYSTACK_PUBLIC_KEY
npm run dev
```

### Database Seeding
```bash
cd Backend
npm run data:import  # Seed products into MongoDB
npm run data:destroy # Clear the database
```

---

## Features & Implementation Status

✅ = Done | 🔧 = In Progress | ❌ = To Do

| Feature | Status |
| ------- | ------ |
| Dynamic Product Rendering from MongoDB | ✅ |
| Shopping Cart (Redux) | ✅ |
| User Auth (JWT/Bcrypt) | ✅ |
| Order System & Checkout Flow | ✅ |
| Paystack Payment Integration | ✅ |
| Real-time Inventory management | ✅ |
| Admin Dashboard (Product CRUD & Orders) | ✅ |
| Production Optimized (Ready for Vercel/Render) | ✅ |
| Search & Category Filtering | 🔧 |
| Pagination | ❌ |

---

## Roadmap

### Phase 10: Production Readiness (Completed)
- Dynamically handle API URLs via environment variables.
- Configured CORS for live deployment domains.
- Standardized error handling for Paystack transactions.

### Phase 11: Final Deployment
- Hosting Backend on **Render**.
- Hosting Frontend on **Vercel**.
- SSL/TLS certification.

---

## License
© 2026 ONEMEN. All rights reserved.
