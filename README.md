<<<<<<< HEAD
# 🛒 Ecommerce Tech Store
=======
# 🛒 TechStore - E-Commerce Platform
>>>>>>> 9f2300c (added admin function)

![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen)
![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38bdf8)

A modern **full-stack e-commerce web application** for tech products built with **React, Node.js, Express, and MongoDB**.

## ✨ Features

- 🏠 Modern, responsive UI with Tailwind CSS
- 🔐 User authentication (JWT)
- 🛍️ Product listing with filters and search
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 📱 Mobile-friendly design
- 🎨 Clean, professional interface
- 🔒 Secure API endpoints

## 🚀 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## 📁 Project Structure

```
tech-store/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # Context providers
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── backend/               # Backend API
│   ├── models/           # Database models
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Backend utilities
└── public/               # Static assets
```

<<<<<<< HEAD
=======
## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/anuragverma4895/Ecommerce-Tech-Store>
cd tech-store
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Environment Variables

**Frontend:** Create `.env` in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend:** Create `.env` in `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 4. Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates sample products and an admin user:
- Email: admin@techstore.com
- Password: admin123

### 5. Run the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in new terminal):**
```bash
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## 👤 Admin Panel

### Admin Login Credentials
| Field    | Value                |
|----------|----------------------|
| Email    | admin@techstore.com  |
| Password | admin123             |

### Admin Dashboard Features
After logging in as admin, you will be redirected to the **Admin Dashboard** at `/admin`:
- 📊 **Dashboard Stats** — Total products, categories, featured items, low stock alerts
- 📋 **Product Management Table** — View all products with search and category filter
- ➕ **Add Product** — Add new products with name, description, price, image URL, category, stock, rating, and featured status
- ✏️ **Edit Product** — Modify existing product details
- 🗑️ **Delete Product** — Remove products with confirmation dialog
- 🔒 **Admin-only access** — Only users with admin privileges can access the dashboard

## 📦 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL

### Backend (Render/Railway)

1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Database (MongoDB Atlas)

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for any IP)
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

>>>>>>> 9f2300c (added admin function)
## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### Admin
- `GET /api/admin/products` - Get all products (admin only)
- `POST /api/admin/products` - Add product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

## 🎨 Features Breakdown

### User Features
- Browse products by category
- Search products
- Filter by price range
- Sort products
- View product details
- Add to cart
- Update cart quantities
- Checkout process
- User authentication

### Admin Features
- Admin dashboard with product stats
- Add new products
- Update products
- Delete products
- Search and filter products
- View low stock alerts

## 👨‍💻 Author

<<<<<<< HEAD
Your Name - (https://github.com/anuragverma4895)
=======
Your Name - [Your GitHub](https://github.com/anuragverma4895)
>>>>>>> 9f2300c (added admin function)

---

**Note:** This is a learning project. Do not use in production without proper security audits and enhancements.
<<<<<<< HEAD

#Happy Coding
=======
>>>>>>> 9f2300c (added admin function)
