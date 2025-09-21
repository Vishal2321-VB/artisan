# Deployment Guide for Local Artisan Ally

This guide provides multiple options to deploy your Local Artisan Ally application online so that others can access it.

## Prerequisites

1. Ensure you have the latest build by running:
   ```bash
   npm run build
   ```
2. The `dist` folder contains all the necessary files for deployment

## Deployment Options

### Option 1: Netlify (Recommended for Ease of Use)

Netlify offers a free tier that's perfect for this application.

#### Steps:
1. Sign up at [netlify.com](https://netlify.com)
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Deploy the site:
   ```bash
   # Navigate to project root
   cd /Users/vishalvb/GEN AI HACK/local-artisan-ally
   # Deploy
   netlify deploy --prod --dir=dist
   ```

#### Alternative Method (Drag & Drop):
1. Visit [app.netlify.com](https://app.netlify.com)
2. Drag and drop the `dist` folder onto the deployment area
3. Netlify will automatically deploy your site and provide a URL

### Option 2: Vercel (Great for React Applications)

Vercel is optimized for React applications and offers a generous free tier.

#### Steps:
1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the site:
   ```bash
   # Navigate to project root
   cd /Users/vishalvb/GEN AI HACK/local-artisan-ally
   # Deploy
   vercel --prod
   ```
   When prompted:
   - Set up and deploy? Yes
   - Which directory? dist
   - Want to override the settings? No

### Option 3: GitHub Pages (Free, GitHub Required)

If you have your code on GitHub, you can use GitHub Pages.

#### Steps:
1. Create a GitHub repository for your project
2. Add the following to `vite.config.ts`:
   ```javascript
   export default defineConfig({
     // ... existing config ...
     base: '/your-repo-name/', // Replace with your repo name
   })
   ```
3. Rebuild the project:
   ```bash
   npm run build
   ```
4. Push to GitHub and enable GitHub Pages in repository settings

### Option 4: Firebase Hosting (Google Platform)

Firebase offers fast, secure hosting with a free tier.

#### Steps:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase in your project:
   ```bash
   # Navigate to project root
   cd /Users/vishalvb/GEN AI HACK/local-artisan-ally
   firebase init hosting
   ```
   Select:
   - Public directory: dist
   - Single-page app: Yes
   - Overwrite index.html: No
4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### Option 5: AWS S3 Static Website Hosting

For those who prefer AWS:

#### Steps:
1. Create an S3 bucket
2. Enable static website hosting on the bucket
3. Upload the contents of the `dist` folder to the bucket
4. Set appropriate permissions (public read access)
5. Configure bucket policy for public access

## Environment Variables for Production

If you're using the AI services with Hugging Face:

1. For Netlify: Set environment variables in the Netlify dashboard
2. For Vercel: Set environment variables in the Vercel dashboard
3. For other platforms: Add the following to your deployment environment:
   ```
   VITE_HF_API_TOKEN=your_actual_huggingface_api_token_here
   ```

## Post-Deployment Checklist

1. ✅ Visit your deployed site URL
2. ✅ Test all pages load correctly
3. ✅ Verify the AI service test page works (if using AI features)
4. ✅ Check that all images and assets load
5. ✅ Test navigation between pages
6. ✅ Verify forms and interactive elements work

## Custom Domain (Optional)

Most hosting platforms allow you to connect a custom domain:

1. Purchase a domain (if you don't have one)
2. In your hosting platform's dashboard, look for "Domain Settings"
3. Add your custom domain
4. Follow the platform's instructions to update DNS records

## Troubleshooting

### Common Issues:

1. **Blank Page After Deployment**:
   - Check that the `base` path in `vite.config.ts` is correct
   - Ensure all assets are loading (check browser console)
   - Verify routing configuration

2. **AI Services Not Working**:
   - Confirm environment variables are set in your hosting platform
   - Check that `VITE_HF_API_TOKEN` is properly configured
   - Verify the token has the correct permissions

3. **Slow Loading Times**:
   - This is normal for the first load due to chunking
   - Subsequent loads will be faster due to caching

## Recommended Approach

For the easiest and fastest deployment, I recommend **Netlify**:
1. No configuration required
2. Automatic SSL
3. Great performance
4. Free tier is sufficient for this application
5. Simple drag-and-drop deployment

The application will be accessible to anyone with the URL provided by your chosen hosting platform!