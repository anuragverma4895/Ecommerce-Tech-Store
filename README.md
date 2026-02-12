# 🛒 Ecommerce Tech Store

![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen)
![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38bdf8)
![License](https://img.shields.io/badge/License-MIT-purple)

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

Frontend: http://localhost:3000
Backend: http://localhost:5000

### Database (MongoDB Atlas)

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for any IP)
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

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
- Add new products
- Update products
- Delete products

## 👨‍💻 Author

Your Name - (https://github.com/anuragverma4895)

---

**Note:** This is a learning project. Do not use in production without proper security audits and enhancements.

#Happy Coding
