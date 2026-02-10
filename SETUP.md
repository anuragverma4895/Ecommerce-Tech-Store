# ⚡ Quick Setup Guide

Follow these steps to get TechStore running on your local machine.

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ npm (comes with Node.js)
- ✅ MongoDB Atlas account - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- ✅ Git - [Download](https://git-scm.com/)
- ✅ Code editor (VS Code recommended)

### Check Installations

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Any recent version
```

## 🚀 Installation Steps

### Step 1: Clone the Project

```bash
git clone <your-repo-url>
cd tech-store
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

Expected output: Dependencies installed successfully (may take 1-2 minutes)

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE M0 cluster
3. Create database user
4. Allow network access (0.0.0.0/0)
5. Get connection string

Your connection string looks like:
```
mongodb+srv://username:password@cluster.mongodb.net/techstore
```

### Step 5: Create Environment Files

**Frontend .env** (in root directory):
```bash
# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

**Backend .env** (in backend directory):
```bash
cd backend
cat > .env << 'ENVFILE'
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/techstore
JWT_SECRET=your_jwt_secret_key_min_32_chars
NODE_ENV=development
ENVFILE
```

⚠️ **Replace:**
- `YOUR_USERNAME` with your MongoDB username
- `YOUR_PASSWORD` with your MongoDB password
- `your_jwt_secret_key_min_32_chars` with a random string

Generate random JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Seed Database

```bash
cd backend
npm run seed
```

Expected output:
```
MongoDB Connected: cluster-xxx.mongodb.net
Database seeded successfully!
```

This creates:
- 15 sample products
- 1 admin user (admin@techstore.com / admin123)

### Step 7: Start Backend

```bash
# From backend directory
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: cluster-xxx.mongodb.net
```

✅ Backend is ready at: http://localhost:5000

### Step 8: Start Frontend

Open NEW terminal:

```bash
# From root directory
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ Frontend is ready at: http://localhost:3000

## 🧪 Verify Everything Works

### Test Backend

Open http://localhost:5000 in browser

Should see: `{"message":"TechStore API is running"}`

### Test Products API

Open http://localhost:5000/api/products

Should see: List of products in JSON format

### Test Frontend

1. Open http://localhost:3000
2. You should see the home page
3. Click "Products" - should show 15 products
4. Try search and filters
5. Click any product to view details

## 👤 Default Admin Account

After seeding:
- **Email:** admin@techstore.com
- **Password:** admin123

Use this to test login functionality.

## 📁 Project Structure

```
tech-store/
├── src/                 # React frontend
├── backend/            # Express API
│   ├── models/         # Database schemas
│   ├── controllers/    # Business logic
│   ├── routes/        # API endpoints
│   └── server.js      # Entry point
├── package.json       # Frontend dependencies
└── .env              # Frontend config
```

## 🛠️ Development Workflow

### Make Changes

1. Edit files in `src/` for frontend
2. Edit files in `backend/` for backend
3. Both support hot reload (auto-refresh)

### View Logs

**Frontend:** Terminal running `npm run dev`
**Backend:** Terminal running `npm run dev` (in backend)

### Stop Servers

Press `Ctrl + C` in each terminal

### Restart Servers

```bash
# Frontend
npm run dev

# Backend (from backend directory)
npm run dev
```

## ❌ Common Issues

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Cannot Connect to MongoDB

**Error:** `MongooseServerSelectionError`

**Solutions:**
1. Check internet connection
2. Verify MongoDB Atlas credentials
3. Ensure IP whitelist includes 0.0.0.0/0
4. Check connection string format

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:**
Backend should have CORS enabled (already configured)

Check `backend/server.js` has:
```js
app.use(cors());
```

## 📚 Next Steps

1. ✅ Read [README.md](./README.md) for features overview
2. ✅ Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy online
3. ✅ Explore the code and customize
4. ✅ Build new features

## 🆘 Need Help?

1. Check error messages carefully
2. Google the error
3. Check MongoDB Atlas dashboard
4. Verify all environment variables
5. Restart both servers

## 🎉 Success!

If you see the TechStore homepage with products, you're all set!

---

**Happy Coding! 🚀**
