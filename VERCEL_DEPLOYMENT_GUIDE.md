# Vercel Deployment Guide - Separate Frontend & Backend

## Project Structure
```
e-commerce-project/
├── backend/              (Deploy as separate Vercel project)
│   ├── server.js
│   ├── products.json
│   ├── package.json
│   └── vercel.json
│
└── frontend/e-commerce-frontend/  (Deploy as separate Vercel project)
    ├── app/
    ├── package.json
    ├── next.config.ts
    └── .env.production
```

## Step 1: Deploy Backend to Vercel

### Option A: Using Git (Recommended)
1. Push your current repository to GitHub (already done)
2. Go to https://vercel.com/new
3. Click "Import Git Repository"
4. Select your GitHub repo
5. Configure:
   - **Framework Preset:** Node.js
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Output Directory:** (leave empty)
   - **Start Command:** `npm start`
6. Click "Deploy"
7. **Copy your Backend URL** (e.g., `https://e-commerce-backend-xyz.vercel.app`)

---

## Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend/e-commerce-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. **Add Environment Variables:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.vercel.app` (from Step 1)
6. Click "Deploy"
7. **Copy your Frontend URL**

---

## Step 3: Verify Deployment

Test both URLs:
- Backend: `https://your-backend-url.vercel.app/products`
- Frontend: `https://your-frontend-url.vercel.app`

---

## Troubleshooting

### Backend not connecting:
1. Check environment variables in Vercel
2. Verify CORS is configured correctly
3. Check backend logs in Vercel dashboard

### Products not showing:
1. Verify `products.json` is included in deployment
2. Check file permissions on Vercel
3. Review server logs

