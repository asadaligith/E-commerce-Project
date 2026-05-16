# Deployment Checklist

## Before Deployment

- [ ] Commit all changes: `git add . && git commit -m "Prepare for separate Vercel deployment"`
- [ ] Push to GitHub: `git push`
- [ ] Both frontend and backend folders have `package.json`
- [ ] `products.json` is in the repository (not in .gitignore)

## Deploy Backend First

1. [ ] Go to https://vercel.com
2. [ ] Click "New Project" → "Import Git Repository"
3. [ ] Select your repository
4. [ ] Configure:
   - Root Directory: `backend`
   - Build Command: `npm install` or leave default
   - Start Command: `npm start`
5. [ ] Click "Deploy"
6. [ ] Wait for deployment to complete
7. [ ] Copy the Backend URL (e.g., `https://e-commerce-backend-xyz.vercel.app`)
8. [ ] Test: Visit `https://your-backend-url.vercel.app/products`

## Deploy Frontend

1. [ ] Go to https://vercel.com
2. [ ] Click "New Project" → "Import Git Repository"
3. [ ] Select your repository (same repo)
4. [ ] Configure:
   - Root Directory: `frontend/e-commerce-frontend`
   - Framework: Next.js
5. [ ] Add Environment Variables:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.vercel.app` (from Backend deployment)
6. [ ] Click "Deploy"
7. [ ] Wait for deployment to complete
8. [ ] Copy the Frontend URL

## Verification

- [ ] Frontend loads: `https://your-frontend-url.vercel.app`
- [ ] Products display from API
- [ ] Add product works
- [ ] Update product works
- [ ] Delete product works

## Notes

- Keep both Vercel projects in the same GitHub repository
- Update `.env.production` in frontend with the actual backend URL after deployment
- Products are stored in `products.json` in the backend folder

