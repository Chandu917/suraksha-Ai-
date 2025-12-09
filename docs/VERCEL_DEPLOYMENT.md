# Deploy SurakshaGPT to Vercel - Step-by-Step Guide

This guide will help you deploy your SurakshaGPT project to Vercel and get a permanent HTTPS URL for shareable links. **No UI or design changes will be made.**

## Prerequisites

- A GitHub account (recommended) or direct deployment from local folder
- A Vercel account (free tier works perfectly)
- Your Firebase configuration ready (from `.env.local`)

---

## Step 1: Install Vercel CLI (Optional but Recommended)

Open your terminal and run:

```bash
npm install -g vercel
```

---

## Step 2: Deploy Your Project

### Option A: Deploy via Vercel CLI (Fastest)

1. **Navigate to your project folder:**
   ```bash
   cd /Users/gangachandu/Desktop/surakshagpt
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```
   - Follow the prompts to authenticate

3. **Deploy your project:**
   ```bash
   vercel
   ```
   
4. **Answer the setup questions:**
   - **Set up and deploy?** → Yes
   - **Which scope?** → Select your account
   - **Link to existing project?** → No
   - **What's your project's name?** → `surakshagpt` (or your preferred name)
   - **In which directory is your code located?** → `./` (press Enter)
   - **Want to override the settings?** → No (press Enter)

5. **Wait for deployment** - Vercel will:
   - Build your Next.js app
   - Deploy it to a temporary URL
   - Show you the deployment URL (e.g., `https://surakshagpt-xxx.vercel.app`)

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```
   - This creates your permanent production URL

### Option B: Deploy via Vercel Dashboard (Alternative)

1. **Go to [vercel.com](https://vercel.com)** and sign in

2. **Click "Add New Project"**

3. **Import your Git repository:**
   - If your project is on GitHub, connect your GitHub account
   - Select the `suraksha-Ai-` repository
   - Click "Import"

4. **Configure your project:**
   - **Project Name:** `surakshagpt` (or your choice)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

5. **Add Environment Variables** (see Step 3 below)

6. **Click "Deploy"**

---

## Step 3: Configure Environment Variables

**CRITICAL:** You must add your environment variables for the app to work.

### Via Vercel CLI:

After deployment, add environment variables:

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Paste your Firebase API key when prompted
# Select: Production, Preview, Development (all three)

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# Paste your Firebase auth domain
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
# Paste your Firebase project ID
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
# Paste your Firebase storage bucket
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
# Paste your Firebase messaging sender ID
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
# Paste your Firebase app ID
# Select: Production, Preview, Development

vercel env add GOOGLE_GENAI_API_KEY
# Paste your Google Generative AI API key
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_APP_URL
# Paste your Vercel production URL (e.g., https://surakshagpt.vercel.app)
# Select: Production, Preview, Development
```

### Via Vercel Dashboard:

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
   - **Value:** Your Firebase API key
   - **Environments:** Check all (Production, Preview, Development)
   - Click **Save**
4. Repeat for all variables listed above

---

## Step 4: Redeploy with Environment Variables

After adding environment variables, redeploy:

### Via CLI:
```bash
vercel --prod
```

### Via Dashboard:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Check **Use existing Build Cache**
5. Click **Redeploy**

---

## Step 5: Get Your Permanent URL

After successful deployment, you'll have:

1. **Production URL:** `https://surakshagpt.vercel.app` (or your custom name)
   - This is your **permanent URL**
   - It will always work, even after updates

2. **Preview URLs:** Generated for each deployment
   - Format: `https://surakshagpt-git-branch.vercel.app`

### To use a custom domain (optional):

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `surakshagpt.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Step 6: Update Your Environment Variable

**IMPORTANT:** Update the `NEXT_PUBLIC_APP_URL` environment variable with your production URL:

### Via CLI:
```bash
vercel env rm NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_APP_URL
# Enter your production URL: https://surakshagpt.vercel.app
# Select: Production
```

### Via Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_APP_URL`
3. Click **Edit**
4. Change value to your production URL: `https://surakshagpt.vercel.app`
5. Click **Save**
6. Redeploy the project

---

## Step 7: Test Your Shareable Links

1. **Visit your production URL:** `https://surakshagpt.vercel.app`

2. **Start a conversation** with the AI

3. **Click the Share button**

4. **Copy the generated link** - it should look like:
   ```
   https://surakshagpt.vercel.app/share/abc123xyz
   ```

5. **Test the link:**
   - Open in a new incognito/private window
   - Share on WhatsApp
   - Share on Twitter/Facebook
   - Verify the preview shows correctly

---

## Step 8: Verify Social Media Previews

Test your shared links on these validators:

1. **Twitter/X Card Validator:**
   - Go to: https://cards-dev.twitter.com/validator
   - Paste your share link
   - Verify preview appears

2. **Facebook Sharing Debugger:**
   - Go to: https://developers.facebook.com/tools/debug/
   - Paste your share link
   - Click "Debug"
   - Verify preview appears

3. **LinkedIn Post Inspector:**
   - Go to: https://www.linkedin.com/post-inspector/
   - Paste your share link
   - Verify preview appears

---

## Future Updates

### How to update your deployed app:

**Via CLI:**
```bash
# Make your code changes
# Then deploy:
vercel --prod
```

**Via Git (if connected to GitHub):**
1. Commit and push your changes to GitHub
2. Vercel automatically deploys the changes
3. Your permanent URL stays the same

**Important:** Your permanent URL (`https://surakshagpt.vercel.app`) will **NEVER change**, even when you update your code. All existing shared links will continue to work.

---

## Troubleshooting

### Issue: "Failed to create shareable link"
**Solution:** 
- Verify all Firebase environment variables are set correctly
- Check Vercel deployment logs for errors
- Ensure Firestore is enabled in Firebase Console

### Issue: Shared links return 404
**Solution:**
- Verify `NEXT_PUBLIC_APP_URL` matches your production URL exactly
- Check that the share was created successfully in Firestore
- Redeploy after updating environment variables

### Issue: Social media previews don't show
**Solution:**
- Wait 24-48 hours for social platforms to cache your metadata
- Use social media debugger tools to force refresh
- Verify `/public/og-image.png` exists

### Issue: Environment variables not working
**Solution:**
- Ensure you selected all environments (Production, Preview, Development)
- Redeploy after adding/updating variables
- Check for typos in variable names

---

## Summary

✅ **Your permanent URL:** `https://surakshagpt.vercel.app` (or your custom domain)

✅ **This URL will never change** - even when you update your code

✅ **All shareable links** will have format: `https://surakshagpt.vercel.app/share/[id]`

✅ **Links work on all platforms:** WhatsApp, Twitter, Facebook, Telegram, LinkedIn

✅ **No UI changes made** - your design remains exactly as it is

---

## Quick Reference Commands

```bash
# Deploy to production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Open project in browser
vercel open
```

---

## Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Firebase Setup:** See `docs/FIREBASE_SETUP.md` in your project
