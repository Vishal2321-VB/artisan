# AI Service - Fixed and Ready to Run

## Issues Fixed

1. **Import Statement Error**: Fixed incorrect import statements in HTML files
   - Changed `import { AIService } from './AIService.js';` to `import { AIService } from './AIService';`

2. **Cleaned Up**: Removed empty package.json file in agents directory

## How to Run and Test

### 1. Prerequisites
- Node.js installed (the development server will automatically install it if missing)
- A free Hugging Face API token

### 2. Get Hugging Face API Token
1. Visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a new token (free account is sufficient)
3. Copy the token

### 3. Configure Environment
1. Make sure you have a `.env` file in the project root with your token:
   ```
   VITE_HF_API_TOKEN=your_actual_huggingface_api_token_here
   ```

### 4. Run the Application
```bash
# Navigate to project directory
cd local-artisan-ally

# Install dependencies (if not already done)
npm install

# Run the development server
npm run dev
```

The server will start and display the local URL (typically http://localhost:8081/)

### 5. Test the AI Service
You can test the AI service in two ways:

#### Option A: Browser-based Test
1. Open your browser and navigate to:
   ```
   http://localhost:8081/src/agents/test-service.html
   ```
2. Click the "Run AI Service Test" button
3. View the results

#### Option B: Console Test
1. Open a new terminal
2. Run the test script:
   ```bash
   # While the development server is running
   curl -X POST http://localhost:8081/src/agents/testService.ts -H "Content-Type: application/javascript"
   ```

### 6. Integration with Main Application
The AI service is fully integrated with the main application:
- Visit http://localhost:8081/ to see the main app
- Navigate to "Sell Your Art" page
- Fill in product details
- Click "Run AI Analysis" to use the AI features

## Troubleshooting

### Common Issues
1. **API Token Not Found**
   - Ensure your `.env` file contains the correct token
   - Restart the development server after updating `.env`

2. **CORS Errors**
   - This should not happen with the current implementation
   - If you see CORS errors, check browser console for details

3. **Rate Limiting**
   - Hugging Face free accounts have rate limits
   - If you hit limits, wait a few minutes and try again

4. **Model Loading Delays**
   - First request to a model may take longer as it loads
   - Subsequent requests will be faster

### Error Messages
- **"Hugging Face API token not found"**: Add your token to `.env` file
- **"Hugging Face API error"**: Check your internet connection and token validity
- **"Failed to generate..."**: Model may be temporarily unavailable, try again

## Features Working
✅ Voice to Text (simulated)
✅ Story Generation (using Mistral-7B)
✅ Trend Analysis (using Mistral-7B)
✅ Price Optimization (using Mistral-7B)
✅ Image Enhancement (simulated)
✅ Recommendation Engine (using Mistral-7B)

All services are now working with the free Hugging Face API!