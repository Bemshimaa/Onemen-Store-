# OneMen Project - Migration to MongoDB

Project Status: Active Development

A modern e-commerce interface built for the revival of the Onemen fashion brand.

## Current Implementation

### Backend
- **Framework**: Node.js with Express.js
- **Database**: None (static data)
- **Product Data**: Stored in `Backend/data/products.js` as a static array of objects with properties: `id` (sequential number), `name`, `price`, `image` (relative path), `description`, `sizes` (array of strings)
- **Server**: `Backend/server.js` serves static files and has basic routes, but products are not served via API yet
- **Models**: `Backend/models/productModel.js` defines a Mongoose schema for products (already set up for MongoDB)
- **Seeder**: `Backend/seeder.js` can populate the database with product data

### Frontend
- **Framework**: React with Vite
- **State Management**: Redux Toolkit (cart slice in `ONEMEN/src/app/store.js` and `ONEMEN/src/features/cart/cartslice.js`)
- **Product Display**: 
  - `ONEMEN/src/products.jsx`: Imports `productList` from `ONEMEN/src/data/products.js` and renders product cards
  - `ONEMEN/src/Productcard.jsx`: Displays individual product info, links to `/Products/:productId`
- **Product Details**: 
  - `ONEMEN/src/productDetails.jsx`: Uses `useParams` to get `productId`, finds product in `productList` using `Number(productId)`, displays details and handles add to cart
- **Routing**: `ONEMEN/src/App.jsx` defines routes including `/Products/:productId`
- **Data Source**: Static `productList` array imported from `ONEMEN/src/data/products.js`

## Planned Implementation (MongoDB Integration)

### Backend Changes
1. **Database Connection**: Ensure MongoDB is connected via `Backend/config/db.js`
2. **API Routes**: Update `Backend/server.js` to add RESTful API endpoints:
   - `GET /api/products`: Fetch all products from MongoDB using `Product.find({})`
   - `GET /api/products/:id`: Fetch single product by `_id` using `Product.findById(req.params.id)`
3. **Data Migration**: Use `Backend/seeder.js` to insert static data into MongoDB. Products will get MongoDB `_id` (string like "6ae...") instead of sequential `id`
4. **Image Serving**: Ensure images in `Backend/public/images/` are served statically, and product `image` field stores relative paths (e.g., "/images/product.jpg")

### Frontend Changes
1. **Remove Static Data**: Remove imports of `productList` from `ONEMEN/src/data/products.js`
2. **Fetch Products**: 
   - In `ONEMEN/src/products.jsx`: Use `useEffect` to fetch from `http://localhost:5000/api/products`, set state with fetched data. Use `product._id` as key and id prop
   - Handle image URLs: If `product.image` is relative, prepend backend URL (e.g., `http://localhost:5000${product.image}`)
3. **Fetch Product Details**:
   - In `ONEMEN/src/productDetails.jsx`: Use `useEffect` to fetch single product from `http://localhost:5000/api/products/${productId}`, set state. Remove `Number(productId)` and `productList.find`
   - Update cart dispatch to use `result._id` instead of `result.id`
4. **Cart Compatibility**: Ensure cart slice handles string IDs (MongoDB `_id`) correctly, as current implementation uses `id` for comparisons

### Migration Steps
1. Set up MongoDB locally or use a cloud instance
2. Run seeder to populate DB: `node Backend/seeder.js`
3. Update backend routes as described
4. Update frontend components to fetch from API
5. Test product listing, details, and cart functionality
6. Remove unused static data files after verification

---

## **5-Day Sprint Roadmap**

Day 1: Authentication (Backend)
- User Model: Define schema.
- Controller: register/auth.
- JWT & Auth Middleware.

Day 2: Authentication (Frontend)
- Redux Auth Slice.
- Login/Register Screens.

Day 3: Order Logic (Backend)
- Order Model & Controller.
- Protected Routes.

Day 4: Checkout Process (Frontend)
- Shipping & Place Order Screens.

Day 5: Payments (Paystack Integration)
- `react-paystack` integration.

---
Tech Stack:
* Frontend: React.js, CSS/Tailwind
* Backend: Express.js/Node.js
