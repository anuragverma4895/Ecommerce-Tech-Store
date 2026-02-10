# 🚀 Deployment Guide

Complete guide to deploy TechStore to production.

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables documented
- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with products
- [ ] All features tested locally
- [ ] Build runs successfully
- [ ] No console errors

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create new project: "TechStore"

### 1.2 Create Cluster
1. Click "Build a Database"
2. Choose FREE M0 cluster
3. Select region closest to you
4. Name cluster: "techstore-cluster"

### 1.3 Database Access
1. Go to "Database Access"
2. Add new database user
3. Username: `techstore_admin`
4. Password: Generate secure password
5. User Privileges: Read and write to any database

### 1.4 Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### 1.5 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `techstore`

Example:
```
mongodb+srv://techstore_admin:YOUR_PASSWORD@techstore-cluster.abc123.mongodb.net/techstore?retryWrites=true&w=majority
```

## 🖥️ Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend
1. Ensure `backend/package.json` has:
```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

### 2.2 Deploy to Render
1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** `techstore-api`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 2.3 Environment Variables
Add these in Render dashboard:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_very_long_random_secret_key_here
NODE_ENV=production
PORT=5000
```

To generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Note your backend URL: `https://techstore-api.onrender.com`

### 2.5 Test Backend
```bash
curl https://techstore-api.onrender.com/
# Should return: {"message":"TechStore API is running"}
```

### 2.6 Seed Database
```bash
# SSH into Render or use local terminal with production MONGODB_URI
cd backend
MONGODB_URI="your_production_uri" npm run seed
```

## 🌐 Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend
1. Update `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
```

2. Create `vercel.json` in root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 3.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.3 Environment Variables
Add in Vercel dashboard:

```env
VITE_API_URL=https://techstore-api.onrender.com/api
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait 1-2 minutes
3. Your app URL: `https://techstore-xyz.vercel.app`

## ✅ Step 4: Verification

### 4.1 Test Backend
```bash
# Health check
curl https://techstore-api.onrender.com/

# Get products
curl https://techstore-api.onrender.com/api/products
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Browse products
3. Test search and filters
4. Try signup/login
5. Add items to cart
6. Complete checkout

### 4.3 Check CORS
If you get CORS errors:

In `backend/server.js`:
```js
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true
}));
```

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Can't connect to database
```
Solution: 
1. Check MongoDB Atlas Network Access (allow 0.0.0.0/0)
2. Verify connection string in MONGODB_URI
3. Ensure password doesn't have special characters
```

**Problem:** 500 errors on API
```
Solution:
1. Check Render logs
2. Verify all environment variables are set
3. Ensure JWT_SECRET is set
```

### Frontend Issues

**Problem:** API calls failing
```
Solution:
1. Verify VITE_API_URL is correct
2. Check Render backend is running
3. Test backend URL directly in browser
```

**Problem:** Blank page
```
Solution:
1. Check Vercel build logs
2. Ensure vite.config.js is correct
3. Verify all dependencies installed
```

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT_SECRET** (64+ characters)
3. **Enable HTTPS only** (both platforms provide this)
4. **Rate limiting** (add in production)
5. **Input validation** (already implemented)

## 📊 Monitoring

### Render
- View logs in Render dashboard
- Monitor API performance
- Check deployment status

### Vercel
- View analytics
- Monitor build status
- Check error logs

## 🔄 Continuous Deployment

Both Render and Vercel auto-deploy when you push to GitHub:

```bash
git add .
git commit -m "Update features"
git push origin main
```

## 💰 Cost

- **MongoDB Atlas:** FREE (M0 cluster, 512MB)
- **Render:** FREE (with sleep after inactivity)
- **Vercel:** FREE (100GB bandwidth)

**Total:** $0/month for hobby projects

## ⚡ Performance Tips

1. **Render sleep:** Free tier sleeps after 15 min inactivity
   - First request may take 30-60 seconds
   - Consider paid tier for production

2. **Optimize images:** Use CDN for product images

3. **Enable caching:** Add cache headers in production

## 🎉 You're Done!

Your TechStore is now live! Share the link:
```
https://your-app-name.vercel.app
```

---

Need help? Check the main README or open an issue on GitHub.
