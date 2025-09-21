import { useState } from "react";
import { AIService } from "./AIService";
import { ProductData, AIWorkflowResult } from "./types";

export const useAIWorkflow = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIWorkflowResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAIWorkflow = async (productData: ProductData) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Step 1: Generate story
      const product_story = await AIService.generateStory(productData);
      
      // Step 2: Analyze trend
      const { trend_score, marketing_recommendations } = await AIService.analyzeTrend(productData);
      
      // Update product data with trend score for price determination
      const updatedProductData = { ...productData, trend_score };
      
      // Step 3: Determine price
      const final_price = await AIService.determinePrice(updatedProductData);
      
      // Step 4: Enhance photo (using a placeholder image for now)
      const final_image = productData.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400";
      
      // Step 5: Generate recommendations
      const actionable_tips = await AIService.generateRecommendations({
        story: product_story,
        trend_score,
        recommended_price: final_price,
        marketing_recommendations
      });
      
      const workflowResult: AIWorkflowResult = {
        product_story,
        trend_score,
        marketing_recommendations,
        final_price,
        final_image,
        actionable_tips
      };
      
      setResult(workflowResult);
      return workflowResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("AI Workflow Error:", err);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const convertVoiceToText = async (audioBlob: Blob) => {
    try {
      const text = await AIService.convertVoiceToText(audioBlob);
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to convert voice to text";
      setError(errorMessage);
      console.error("Voice to Text Error:", err);
      return null;
    }
  };

  return {
    isProcessing,
    result,
    error,
    runAIWorkflow,
    convertVoiceToText
  };
};