# Hosting Options for Local Artisan Ally

This document provides several ways to host your Local Artisan Ally application so it can be accessed online or shared with others.

## Current Status

✅ Application successfully built
✅ Local hosting server ready (running on port 3000)
✅ All files prepared for deployment

## Hosting Options

### 1. Local Network Sharing (Currently Running)

Your application is already running on a local server that can be accessed by other devices on the same network.

**Server Status**: ✅ Running on port 3000

**Access URLs**:
- Local access: http://localhost:3000
- Network access: http://YOUR_IP_ADDRESS:3000

**To share with others on your network**:
1. Find your IP address:
   - **Windows**: Open Command Prompt and run `ipconfig`
   - **Mac/Linux**: Open Terminal and run `ifconfig`
2. Look for your local IP (usually starts with 192.168.x.x or 10.x.x.x)
3. Share the URL: `http://YOUR_IP_ADDRESS:3000`

**Example**: If your IP is 192.168.1.15, others can access your app at http://192.168.1.15:3000

### 2. Cloud Hosting Platforms (Recommended for Public Access)

#### Option A: Netlify (Easiest)
1. Visit [netlify.com](https://netlify.com) and sign up for a free account
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Run: `netlify deploy --prod --dir=dist`
4. Follow the prompts to deploy your site
5. Netlify will provide a public URL for your application

#### Option B: Vercel (Optimized for React)
1. Visit [vercel.com](https://vercel.com) and sign up for a free account
2. Install Vercel CLI: `npm install -g vercel`
3. Run: `vercel --prod` from your project directory
4. When prompted:
   - Set up and deploy? Yes
   - Which directory? dist
   - Want to override the settings? No
5. Vercel will provide a public URL

#### Option C: GitHub Pages (Free with GitHub)
1. Create a GitHub repository for your project
2. Add the following to `vite.config.ts`:
   ```javascript
   export default defineConfig({
     // ... existing config ...
     base: '/your-repo-name/', // Replace with your repo name
   })
   ```
3. Rebuild: `npm run build`
4. Push to GitHub
5. Enable GitHub Pages in repository settings

### 3. Docker Deployment (For Advanced Users)

If you want to containerize your application:

1. Create a `Dockerfile` in your project root:
   ```dockerfile
   FROM nginx:alpine
   COPY dist/ /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build and run:
   ```bash
   docker build -t local-artisan-ally .
   docker run -p 8080:80 local-artisan-ally
   ```

3. Access at: http://localhost:8080

### 4. Traditional Web Hosting

If you have access to traditional web hosting with FTP:

1. Upload the contents of the `dist` folder to your web server
2. Ensure your web server is configured to serve static files
3. The application will be accessible at your domain

## AI Services Configuration

If you're using the AI features, you'll need to configure environment variables on your hosting platform:

### For Netlify:
1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add: `VITE_HF_API_TOKEN` with your Hugging Face API token

### For Vercel:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add: `VITE_HF_API_TOKEN` with your Hugging Face API token

### For Other Platforms:
Set the environment variable: `VITE_HF_API_TOKEN=your_actual_huggingface_api_token_here`

## Quick Start Commands

```bash
# Make sure you're in the project directory
cd /Users/vishalvb/GEN AI HACK/local-artisan-ally

# Build the project (if not already built)
npm run build

# Run local hosting server
npm run host

# Deploy to Netlify (requires Netlify account)
netlify deploy --prod --dir=dist

# Deploy to Vercel (requires Vercel account)
vercel --prod
```

## Troubleshooting

### Common Issues:

1. **Application not loading**:
   - Ensure you've run `npm run build` before deploying
   - Check that all files from the `dist` folder were uploaded

2. **Blank page after deployment**:
   - Verify the `base` path in `vite.config.ts` matches your deployment URL
   - Check browser console for errors

3. **AI services not working**:
   - Confirm environment variables are set on your hosting platform
   - Verify your Hugging Face API token is valid

## Recommendations

For **immediate sharing** on your local network:
- Your application is already running at http://localhost:3000
- Just share your IP address with others on the same network

For **public access**:
- **Netlify** is the easiest option with no configuration required
- **Vercel** is optimized for React applications like yours

The application is ready to be hosted and shared with the world! 🚀