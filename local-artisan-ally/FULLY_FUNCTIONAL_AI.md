# Fully Functional AI Agents Implementation

This document explains how to set up and use the fully functional AI agents workflow in the Local Artisan Ally application.

## Prerequisites

1. **Hugging Face API Token**: You need a Hugging Face API token to use the AI services. You can get one for free from [Hugging Face](https://huggingface.co/settings/tokens).

2. **Node.js**: Make sure you have Node.js installed (version 16 or higher).

## Setup Instructions

### 1. Install Dependencies

First, install the required dependencies:

```bash
cd local-artisan-ally
npm install
```

(Note: We no longer need the OpenAI package as we're using Hugging Face's API directly)

### 2. Configure Environment Variables

Create a `.env` file in the root of the project based on the `.env.example` file:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your Hugging Face API token:

```env
# Hugging Face API Token (required for AI services)
VITE_HF_API_TOKEN=your_actual_huggingface_api_token_here
```

**Important**: Never commit your actual API key to version control. The `.env` file is included in `.gitignore` to prevent this.

### 3. Start the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or another port if 5173 is busy).

## How the AI Agents Work

### 1. Voice Agent
- Converts voice input to text using speech-to-text services
- Currently simulated in the browser (in production, this would use server-side processing)

### 2. Story AI
- Generates compelling product descriptions using Hugging Face's Mistral-7B model
- Takes product name, category, and description as input

### 3. Trend AI
- Analyzes market trends for product categories using Hugging Face's Mistral-7B model
- Provides trend scores and marketing recommendations

### 4. Price AI
- Recommends optimal pricing based on product details and market trends using Hugging Face's Mistral-7B model
- Considers production costs, competitor pricing, and demand

### 5. Photo AI
- Enhances product images (currently simulated)
- In a full implementation, would connect to image enhancement APIs

### 6. Recommendation Agent
- Combines all AI insights into actionable recommendations for sellers using Hugging Face's Mistral-7B model
- Helps optimize product listings for better sales

## Using the AI Features

### In the "Sell Your Art" Page:
1. Fill in your product details (name, category, description, price)
2. Click "Run AI Analysis" to generate AI-powered insights
3. View the generated product story, trend analysis, and pricing recommendations

### In the Seller Dashboard:
1. View AI-generated recommendations for your products
2. See trend scores and suggested improvements

## API Usage and Costs

The implementation uses Hugging Face's API, which offers free access with rate limits:

1. Free accounts get 1000 requests per day
2. For higher usage, you can upgrade to a paid plan
3. Consider implementing caching for frequently requested data to stay within limits

## Extending the Implementation

To enhance the AI capabilities further:

1. **Voice Processing**: Integrate with actual speech-to-text services like OpenAI Whisper
2. **Image Enhancement**: Connect to image processing APIs for real photo enhancement
3. **Caching**: Implement caching to reduce API calls and costs
4. **Error Handling**: Add more robust error handling and fallback mechanisms
5. **Analytics**: Track the effectiveness of AI recommendations

## Troubleshooting

### "API Token Missing" Error
Make sure you've added your Hugging Face API token to the `.env` file.

### "CORS" Errors
The implementation uses `dangerouslyAllowBrowser: true` for development. In production, API calls should be made from the server.

### "Rate Limiting" Issues
If you encounter rate limiting, consider adding delays between API calls or implementing a queue system.

## Security Considerations

1. **API Keys**: Never expose API keys in client-side code in production
2. **Server-Side Processing**: Move API calls to server-side functions in production
3. **Input Validation**: Validate all user inputs before sending to AI services