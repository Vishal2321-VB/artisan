# Testing the AI Service Implementation

This document explains how to test the AI service implementation that uses Hugging Face's free API.

## Prerequisites

1. **Hugging Face API Token**: You need a Hugging Face API token (free)
2. **Environment Configuration**: Set up your `.env` file with the token

## Test Files

The following test files have been created:

1. [testFullAIService.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/testFullAIService.ts) - Comprehensive TypeScript test
2. [testHuggingFace.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/testHuggingFace.ts) - Hugging Face connectivity test
3. [testHuggingFaceNode.js](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/testHuggingFaceNode.js) - Node.js environment test
4. [test.html](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/test.html) - Browser-based interactive test

## How to Run Tests

### 1. Set Up Environment

First, make sure you have your Hugging Face API token in your `.env` file:

```env
VITE_HF_API_TOKEN=your_huggingface_api_token_here
```

### 2. Run TypeScript Tests

To run the TypeScript test:

```bash
# Make sure you're in the project root
cd local-artisan-ally

# Run the test
npx vite-node src/agents/testFullAIService.ts
```

### 3. Run Browser Tests

To run the browser-based test:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173/src/agents/test.html
   ```

3. Click the "Run AI Service Test" button

### 4. Run Node.js Test

To run the Node.js test:

```bash
# Make sure you're in the project root
cd local-artisan-ally

# Run the test
node src/agents/testHuggingFaceNode.js
```

## What the Tests Check

1. **API Connectivity**: Verifies that the Hugging Face API is accessible
2. **Authentication**: Ensures your API token is correctly configured
3. **Model Access**: Confirms that the Mistral-7B model can be accessed
4. **Service Functions**: Tests each AI service function (story generation, trend analysis, etc.)
5. **Error Handling**: Verifies that errors are properly handled

## Expected Results

When the tests are successful, you should see:

1. Connection to Hugging Face API established
2. Successful generation of product stories
3. Trend analysis with scores and recommendations
4. Price recommendations
5. Marketing suggestions

## Troubleshooting

### "API token missing" error
Make sure you've set your `VITE_HF_API_TOKEN` in the `.env` file.

### "CORS" errors
The implementation should work in the browser environment. If you encounter CORS issues, make sure you're running the test through the development server.

### "Rate limiting" errors
Hugging Face has rate limits on free accounts. If you hit the limit, wait a few minutes and try again.

### "Model loading" messages
Some models may take a moment to load on Hugging Face's servers. This is normal and should only happen on first use.

## Manual Testing

You can also manually test the integration by:

1. Starting the development server:
   ```bash
   npm run dev
   ```

2. Navigating to the main application:
   ```
   http://localhost:5173
   ```

3. Going to the "Sell Your Art" page
4. Filling in product details
5. Clicking "Run AI Analysis"

This will use the same AI service implementation and provide a real-world test of the integration.