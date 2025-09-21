# AI Agents Workflow Implementation

This document explains how the AI agents workflow has been integrated into the Local Artisan Ally application.

## Overview

The AI agents workflow consists of 6 specialized agents that work together to enhance product listings:

1. **Voice Agent** - Converts voice input to text
2. **Story AI** - Generates compelling product stories
3. **Trend AI** - Predicts market demand and trends
4. **Price AI** - Recommends optimal selling prices
5. **Photo AI** - Enhances product images
6. **Recommendation Agent** - Provides actionable seller recommendations

## Implementation Structure

The implementation is organized in the following files:

```
src/
└── agents/
    ├── AIService.ts          # Fully functional Hugging Face service implementations
    ├── useAIWorkflow.ts      # React hook for using the AI workflow
    ├── types.ts              # TypeScript types for the AI workflow
    └── components/
        ├── AIProductForm.tsx     # Component for running AI analysis on products
        └── AIRecommendations.tsx # Component for displaying AI recommendations
```

## Integration Points

### 1. Sell Your Art Page

The AI workflow has been integrated into the product listing page:

- Added an "AI Product Enhancement" section with:
  - "Run AI Analysis" button to generate recommendations
  - "Voice Description" button to simulate voice input
  - Display of AI-generated insights

### 2. Seller Dashboard

The dashboard now includes AI recommendations for products:

- Trend scores and recommended pricing
- Marketing suggestions in badge format

## How It Works

1. **Data Collection**: Product data is collected from the form (name, category, description, price, tags)
2. **AI Processing**: The [useAIWorkflow](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/useAIWorkflow.ts#L7-L77) hook orchestrates the AI agents in sequence:
   - Story generation based on product details using Hugging Face Mistral-7B model
   - Trend analysis for the product category using Hugging Face Mistral-7B model
   - Price optimization using trend data and Hugging Face Mistral-7B model
   - Image enhancement (simulated but ready for integration)
   - Recommendation generation combining all insights using Hugging Face Mistral-7B model
3. **Results Display**: AI-generated insights are displayed to help sellers optimize their listings

## API Configuration

To use the fully functional AI services, you need to:

1. Obtain a free Hugging Face API token from [Hugging Face](https://huggingface.co/settings/tokens)
2. Create a `.env` file based on `.env.example`
3. Add your API token to the `.env` file

## Usage

To use the AI features:

1. Navigate to "Sell Your Art" page
2. Fill in product details
3. Click "Run AI Analysis" to generate insights
4. View recommendations in the Seller Dashboard

## Extending the Implementation

The current implementation is fully functional with OpenAI services. To enhance it further:

1. **Voice Input**: Integrate with actual speech-to-text services like OpenAI Whisper
2. **Image Processing**: Connect to image processing APIs for real photo enhancement
3. **Caching**: Implement caching to reduce API calls and costs
4. **Error Handling**: Add more robust error handling and fallback mechanisms
5. **Analytics**: Track the effectiveness of AI recommendations

## Usage

To use the AI features:

1. Navigate to "Sell Your Art" page
2. Fill in product details
3. Click "Run AI Analysis" to generate insights
4. View recommendations in the Seller Dashboard