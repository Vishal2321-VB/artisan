# AI Service Setup and Running Instructions

## Overview
This document provides step-by-step instructions to set up and run the AI services in the Local Artisan Ally application. The AI services use Hugging Face APIs which are free to use with registration.

## Prerequisites
1. Node.js (version 16 or higher)
2. npm (comes with Node.js)
3. A free Hugging Face account

## Setup Instructions

### 1. Get Hugging Face API Token
1. Visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Give it a name (e.g., "local-artisan-ally")
4. Select "Read" access
5. Click "Create token"
6. Copy the generated token (you'll need it in step 3)

### 2. Clone and Install (if not already done)
```bash
# If you haven't cloned the repository yet:
git clone <repository-url>
cd local-artisan-ally

# Install dependencies
npm install
```

### 3. Configure Environment Variables
1. Open the `.env` file in the project root
2. Replace `your_actual_huggingface_api_token_here` with your actual Hugging Face API token
3. Save the file

Example of a properly configured `.env` file:
```
VITE_HF_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Run the Development Server
```bash
npm run dev
```

The server will start and display the local URL (typically http://localhost:8082/)

## Testing the AI Services

### Option 1: Browser-based Testing (Recommended)
1. Once the development server is running, open your browser
2. Navigate to: `http://localhost:8082/src/agents/test-service.html`
3. Click the "Run AI Service Test" button
4. View the results

### Option 2: Direct API Testing
You can also test the AI services through the main application:
1. Visit `http://localhost:8082/`
2. Navigate to the "Sell Your Art" page
3. Fill in product details
4. Click "Run AI Analysis" to use the AI features

## Troubleshooting

### Common Issues and Solutions

1. **"Hugging Face API token not found" Error**
   - Ensure your `.env` file contains the correct token
   - Make sure there are no extra spaces or quotes around the token
   - Restart the development server after updating `.env`

2. **"Failed to fetch" or Network Errors**
   - Check your internet connection
   - Verify the API token is valid
   - Check if Hugging Face services are temporarily down

3. **Slow Response Times**
   - First requests to a model may take longer as it loads
   - Subsequent requests will be faster
   - Hugging Face free accounts have rate limits

4. **Import Statement Errors**
   - Make sure you're using the development server (npm run dev)
   - Don't open HTML files directly in the browser (file:// protocol)
   - The import statements are correct for the Vite development environment

### Error Messages
- **"Hugging Face API token not found"**: Add your token to `.env` file and restart the server
- **"Hugging Face API error"**: Check your internet connection and token validity
- **"Failed to generate..."**: Model may be temporarily unavailable, try again

## Features Implemented

✅ Voice to Text (simulated)
✅ Story Generation (using Mistral-7B)
✅ Trend Analysis (using Mistral-7B)
✅ Price Optimization (using Mistral-7B)
✅ Image Enhancement (simulated)
✅ Recommendation Engine (using Mistral-7B)

All services are working with the free Hugging Face API!

## Models Used

- **Story Generation**: mistralai/Mistral-7B-Instruct-v0.2
- **Trend Analysis**: mistralai/Mistral-7B-Instruct-v0.2
- **Price Optimization**: mistralai/Mistral-7B-Instruct-v0.2
- **Recommendations**: mistralai/Mistral-7B-Instruct-v0.2

These are free-to-use models on Hugging Face that provide good results for our use cases.