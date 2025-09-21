# AI Agents Implementation

This directory contains the implementation of the AI agents workflow for the Local Artisan Ally application.

## Overview

The AI agents workflow consists of 6 specialized agents that work together to enhance product listings for artisans:

1. **Voice Agent** - Converts voice input to text
2. **Story AI** - Generates compelling product stories
3. **Trend AI** - Predicts market demand and trends
4. **Price AI** - Recommends optimal selling prices
5. **Photo AI** - Enhances product images
6. **Recommendation Agent** - Provides actionable seller recommendations

## Files

- [AIService.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/AIService.ts) - Implementation of all AI agents using OpenAI API
- [useAIWorkflow.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/useAIWorkflow.ts) - React hook that orchestrates the AI workflow
- [types.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/types.ts) - TypeScript types for the AI workflow
- [components/](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/components) - React components for UI integration
- [testAIService.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/testAIService.ts) - Test script for the AI service
- [testOpenAI.ts](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/testOpenAI.ts) - Test script for OpenAI integration

## How It Works

The workflow is orchestrated by the [useAIWorkflow](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/src/agents/useAIWorkflow.ts#L7-L77) hook, which:

1. Takes product data as input
2. Calls each AI agent in sequence
3. Combines the results into actionable insights
4. Returns the final recommendations to the UI

## API Integration

The implementation uses the Hugging Face API for all AI services:

- **Story Generation**: Uses Mistral-7B model to create compelling product descriptions
- **Trend Analysis**: Analyzes market trends and provides recommendations using Mistral-7B
- **Price Optimization**: Recommends optimal pricing based on various factors using Mistral-7B
- **Recommendations**: Combines all insights into actionable advice using Mistral-7B

## Configuration

To use the AI services, you need to:

1. Obtain a free Hugging Face API token from [Hugging Face](https://huggingface.co/settings/tokens)
2. Add it to your environment variables (see [.env.example](file:///Users/vishalvb/GEN%20AI%20HACK/local-artisan-ally/.env.example))
3. Restart the development server

## Testing

You can test the AI services by running:

```bash
npm run dev
```

And then navigating to the "Sell Your Art" page to use the AI features.