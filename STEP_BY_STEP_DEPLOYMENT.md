# Step-by-Step Vercel Deployment Guide

## BACKEND DEPLOYMENT (First)

### Step 1: Create Backend Project on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select: `asadaligith/E-commerce-Project`
5. Configure:
   - **Project Name**: e-commerce-backend (or your choice)
   - **Root Directory**: `backend`
   - **Framework Preset**: Other / None
   - **Build Command**: (keep default - auto-detected)
   - **Install Command**: (keep default)
   - **Output Directory**: (leave empty)
6. Click "Deploy"
7. **⏱️ WAIT for deployment to complete** (2-5 minutes)
8. **COPY the Backend URL** from the deployment screen
   - Example: `https://e-commerce-backend-xyz123.vercel.app`

---

## FRONTEND DEPLOYMENT (Second)

### Step 2: Create Frontend Project on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select: `asadaligith/E-commerce-Project` (same repo)
5. Configure:
   - **Project Name**: e-commerce-frontend (or your choice)
   - **Root Directory**: `frontend/e-commerce-frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: (keep default)
6. **BEFORE DEPLOYING, Add Environment Variable:**
   - Click "Environment Variables" section
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.vercel.app` (from Step 1)
   - Select: Production, Preview, Development
7. Click "Deploy"
8. **⏱️ WAIT for deployment to complete** (3-5 minutes)
9. **COPY the Frontend URL**
   - Example: `https://e-commerce-frontend-xyz123.vercel.app`

---

## VERIFICATION (Step 3)

### Test Backend API
Visit: `https://your-backend-url.vercel.app/products`
- Should see JSON with products array
- Example response:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 50000,
      "category": "Electronics"
    }
  ]
}
```

### Test Frontend Application
Visit: `https://your-frontend-url.vercel.app`
- Should see "E-Commerce CRUD Dashboard"
- Products should display automatically
- Form should be visible at top
- NO 404 or blank page

### Test CRUD Operations
1. **Add Product**: Fill form and click "Add Product"
2. **Edit Product**: Click "Edit" on any product
3. **Delete Product**: Click "Delete" and confirm
4. **Verify Toast Notifications**: Success/Error messages appear

---

## Troubleshooting

### Frontend Shows 404
- [ ] Environment variable `NEXT_PUBLIC_API_URL` is set in Vercel
- [ ] Redeploy frontend after setting environment variable
- [ ] Check browser console (F12) for exact API URL being used

### Products Not Loading
- [ ] Check if backend URL is correct
- [ ] Verify backend is deployed and responding
- [ ] Check CORS configuration includes frontend URL
- [ ] Look at browser Network tab (F12) for failed requests

### Add/Edit/Delete Fails
- [ ] Check backend logs in Vercel dashboard
- [ ] Verify backend responds to requests
- [ ] Check console for error messages

### Still Having Issues?
Check these files for recent changes:
- Backend CORS: `backend/api/index.js` (line 10-16)
- Frontend API URL: `frontend/e-commerce-frontend/app/page.tsx` (line 36-37)
- Environment Setup: `.env.production` (both frontend and backend)

---

## Final Checklist

- [ ] Backend deployed successfully
- [ ] Backend URL copied
- [ ] Frontend environment variable set with backend URL
- [ ] Frontend deployed successfully
- [ ] Backend API responding with products
- [ ] Frontend page loads without 404
- [ ] Can add product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Notifications appear correctly

✅ **DEPLOYMENT COMPLETE!**
