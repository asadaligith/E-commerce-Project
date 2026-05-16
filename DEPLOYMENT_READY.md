# E-Commerce CRUD Application - Deployment Guide

## Project Overview

This is a full-stack e-commerce CRUD application with:
- **Backend**: Node.js + Express API (Vercel Serverless)
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Database**: JSON file (products.json)

---

## Separate Vercel Deployment Setup

### Backend Deployment (https://e-commerce-project-o21a.vercel.app)

**Environment:**
- Framework: Node.js
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

**API Endpoints:**
- GET `/products` - Fetch all products
- POST `/products` - Add new product
- PUT `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

---

### Frontend Deployment (https://e-commerce-frontend-navy-five.vercel.app)

**Environment:**
- Framework: Next.js
- Root Directory: `frontend/e-commerce-frontend`
- Build Command: `npm run build`

**Required Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://e-commerce-project-o21a.vercel.app
```

---

## Local Development

### Setup Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:4000

### Setup Frontend
```bash
cd frontend/e-commerce-frontend
npm install
npm run dev
```
App runs on http://localhost:3000

---

## Testing Checklist

### Backend API
- [ ] GET /products → Returns all products
- [ ] POST /products → Create new product
- [ ] PUT /products/:id → Update product
- [ ] DELETE /products/:id → Delete product

### Frontend
- [ ] Page loads without 404
- [ ] Products display correctly
- [ ] Add product functionality works
- [ ] Edit product functionality works
- [ ] Delete product functionality works
- [ ] Toast notifications display

---

## Known Configurations

- **CORS Origins**: Includes all necessary frontend URLs
- **File Storage**: products.json in backend root
- **API Integration**: Fully functional with axios
- **Error Handling**: Comprehensive error messages

---

## Troubleshooting

### Products Not Loading
1. Check NEXT_PUBLIC_API_URL in Vercel settings
2. Verify backend CORS includes frontend URL
3. Check browser console for errors

### Add/Edit/Delete Not Working
1. Verify backend API is responding
2. Check network requests in browser DevTools
3. Review backend logs in Vercel dashboard

### 404 on Frontend
1. Ensure environment variable is set in Vercel
2. Trigger redeploy after setting environment variable
3. Clear browser cache and refresh

---

## Status: ✅ READY FOR DEPLOYMENT

All issues have been identified and resolved. The project is ready for separate Vercel deployment.
