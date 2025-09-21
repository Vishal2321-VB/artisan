import { ProductData } from "./types";

// Hugging Face API configuration
const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
const HF_API_BASE_URL = "https://api-inference.huggingface.co/models";

// Free models that work well for our use cases
const MODELS = {
  STORY_GENERATION: "mistralai/Mistral-7B-Instruct-v0.2",
  TREND_ANALYSIS: "mistralai/Mistral-7B-Instruct-v0.2",
  PRICE_OPTIMIZATION: "mistralai/Mistral-7B-Instruct-v0.2",
  RECOMMENDATIONS: "mistralai/Mistral-7B-Instruct-v0.2"
};

// Helper function to make API calls to Hugging Face
async function queryHuggingFace(model: string, payload: any) {
  if (!HF_API_TOKEN) {
    console.warn("Hugging Face API token is missing. Using fallback responses.");
    return null; // Will trigger fallback responses
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${HF_API_BASE_URL}/${model}`, {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Hugging Face API error: ${response.status} ${response.statusText}. Using fallback.`);
      return null; // Will trigger fallback responses
    }

    const result = await response.json();
    
    // Check if the model is still loading
    if (result.error && result.error.includes('loading')) {
      console.warn("Model is loading, using fallback response");
      return null;
    }
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn("Request timeout, using fallback response");
      } else {
        console.warn("Hugging Face API call failed, using fallback:", error.message);
      }
    } else {
      console.warn("Unknown error occurred, using fallback:", error);
    }
    return null; // Will trigger fallback responses
  }
}

export class AIService {
  // Voice agent - converts voice to text
  static async convertVoiceToText(audioInput: Blob): Promise<string> {
    try {
      // In a production environment, you would send the audio to a speech-to-text service
      // For this implementation, we'll simulate with a simple transcription
      console.log("Converting voice to text...");
      
      // For demonstration purposes, we'll return a sample transcription
      // In a real implementation, you would use a speech-to-text service
      return "This is a simulated transcription of the seller's voice input describing their product. In a real implementation, this would use speech-to-text services.";
    } catch (error) {
      console.error("Error converting voice to text:", error);
      throw new Error("Failed to convert voice to text");
    }
  }

  // Story AI - generates compelling product stories
  static async generateStory(productData: ProductData): Promise<string> {
    try {
      console.log("Generating product story...");
      
      const prompt = `Create a compelling product description for ${productData.product_name}, 
      which is a ${productData.category}. The product is described as: ${productData.description}. 
      Focus on the craftsmanship, uniqueness, and appeal to potential buyers. 
      Keep it under 200 words.`;
      
      const payload = {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      };
      
      const result = await queryHuggingFace(MODELS.STORY_GENERATION, payload);
      
      if (result && result[0]?.generated_text) {
        return result[0].generated_text.trim();
      }
      
      // Fallback story when API is not available
      return `Discover the beauty of authentic ${productData.category.toLowerCase()} with ${productData.product_name}. ${productData.description} Each piece is carefully crafted with attention to detail, representing the rich tradition of local artisanship. This unique creation combines traditional techniques with contemporary appeal, making it a perfect addition to your collection or a thoughtful gift for someone special.`;
    } catch (error) {
      console.error("Error generating product story:", error);
      // Return fallback story instead of throwing error
      return `Discover the beauty of authentic ${productData.category.toLowerCase()} with ${productData.product_name}. ${productData.description} Each piece is carefully crafted with attention to detail, representing the rich tradition of local artisanship.`;
    }
  }

  // Trend AI - predicts market demand and trends
  static async analyzeTrend(productData: ProductData): Promise<{ trend_score: number; marketing_recommendations: string[] }> {
    try {
      console.log("Analyzing market trends...");
      
      const prompt = `Analyze the market trends for ${productData.category} products. 
      Consider factors like seasonal demand, target demographics, and current market interest. 
      Provide a trend score between 0 and 1 (where 1 is highest demand), 
      and 5 specific marketing recommendations for selling this type of product.`;
      
      const payload = {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.5,
          top_p: 0.9,
          return_full_text: false
        }
      };
      
      const result = await queryHuggingFace(MODELS.TREND_ANALYSIS, payload);
      
      if (result && result[0]?.generated_text) {
        const response = result[0].generated_text.trim();
        
        // Parse the response to extract trend score and recommendations
        const trendScoreMatch = response.match(/trend\s*score[\\s\\S]*?([0-9]*\.?[0-9]+)/i);
        const trendScore = trendScoreMatch ? parseFloat(trendScoreMatch[1]) : 0.7;
        
        // Extract recommendations (assuming they're in a list format)
        const recommendations: string[] = [];
        const lines = response.split('\\n');
        for (const line of lines) {
          if (line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./)) {
            recommendations.push(line.trim().replace(/^[-•\d.]+\s*/, ''));
          }
        }
        
        if (recommendations.length > 0) {
          return {
            trend_score: Math.min(Math.max(trendScore, 0), 1),
            marketing_recommendations: recommendations.slice(0, 5)
          };
        }
      }
      
      // Fallback recommendations when API is not available
      const categoryTrends = {
        'textiles & fabrics': 0.8,
        'pottery & ceramics': 0.7,
        'jewelry & accessories': 0.9,
        'wood & bamboo crafts': 0.6,
        'metalwork': 0.5,
        'paintings & art': 0.8,
        'home decor': 0.7,
        'leather goods': 0.6
      };
      
      const fallbackScore = categoryTrends[productData.category.toLowerCase() as keyof typeof categoryTrends] || 0.7;
      
      return {
        trend_score: fallbackScore,
        marketing_recommendations: [
          `Highlight the unique craftsmanship of your ${productData.category.toLowerCase()}`,
          "Target customers interested in authentic, handmade items",
          "Use lifestyle imagery to show the product in use",
          "Emphasize the story and cultural significance behind your product",
          "Consider seasonal marketing opportunities for maximum appeal"
        ]
      };
    } catch (error) {
      console.error("Error analyzing trends:", error);
      // Return default values in case of error
      return {
        trend_score: 0.5,
        marketing_recommendations: [
          "Highlight the unique craftsmanship of your product",
          "Target customers interested in authentic, handmade items",
          "Use lifestyle imagery to show the product in use",
          "Emphasize the story and cultural significance behind your product",
          "Consider seasonal marketing opportunities"
        ]
      };
    }
  }

  // Price AI - recommends optimal selling price
  static async determinePrice(productData: ProductData): Promise<number> {
    try {
      console.log("Determining optimal price...");
      
      const prompt = `Recommend an optimal selling price for ${productData.product_name}, 
      a ${productData.category} product described as: ${productData.description}. 
      The current price is ₹${productData.price}. 
      The market trend score is ${productData.trend_score}.
      Consider factors like production costs, competitor pricing, and market demand. 
      Respond with only the recommended price as a number without any currency symbols or text.`;
      
      const payload = {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 50,
          temperature: 0.3,
          top_p: 0.9,
          return_full_text: false
        }
      };
      
      const result = await queryHuggingFace(MODELS.PRICE_OPTIMIZATION, payload);
      
      if (result && result[0]?.generated_text) {
        const response = result[0].generated_text.trim();
        const recommendedPrice = parseFloat(response.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(recommendedPrice) && recommendedPrice > 0) {
          return recommendedPrice;
        }
      }
      
      // Fallback price optimization when API is not available
      const trendMultiplier = productData.trend_score || 0.7;
      const basePrice = productData.price;
      
      // Simple price optimization based on trend score
      // Higher trend score suggests we can price slightly higher
      const optimizedPrice = basePrice * (0.9 + (trendMultiplier * 0.2));
      
      return Math.round(optimizedPrice * 100) / 100; // Round to 2 decimal places
    } catch (error) {
      console.error("Error determining price:", error);
      // Return the original price in case of error
      return productData.price;
    }
  }

  // Photo AI - enhances product images
  static async enhancePhoto(image: string): Promise<string> {
    try {
      console.log("Enhancing product image...");
      // In a real implementation, this would process the image using an image enhancement API
      // For now, we'll just return the original image
      return image;
    } catch (error) {
      console.error("Error enhancing photo:", error);
      // Return the original image in case of error
      return image;
    }
  }

  // Recommendation Agent - provides actionable recommendations
  static async generateRecommendations(data: {
    story: string;
    trend_score: number;
    recommended_price: number;
    marketing_recommendations: string[];
  }): Promise<string[]> {
    try {
      console.log("Generating seller recommendations...");
      
      const prompt = `Based on the following product information, provide 5 actionable recommendations for the seller:
      Product Story: ${data.story}
      Market Trend Score: ${data.trend_score}
      Recommended Price: ₹${data.recommended_price}
      Existing Marketing Recommendations: ${data.marketing_recommendations.join('; ')}
      
      Provide 5 specific, actionable recommendations for the seller to improve their product listing and sales.
      Format each recommendation on a new line starting with a dash (-).`;
      
      const payload = {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.5,
          top_p: 0.9,
          return_full_text: false
        }
      };
      
      const result = await queryHuggingFace(MODELS.RECOMMENDATIONS, payload);
      
      if (result && result[0]?.generated_text) {
        const response = result[0].generated_text.trim();
        
        // Extract recommendations from the response
        const recommendations: string[] = [];
        const lines = response.split('\\n');
        for (const line of lines) {
          const cleanLine = line.trim();
          if (cleanLine.startsWith('-') || cleanLine.startsWith('•')) {
            recommendations.push(cleanLine.replace(/^[-•]\s*/, ''));
          }
        }
        
        if (recommendations.length >= 3) {
          return recommendations.slice(0, 5);
        }
      }
      
      // Fallback recommendations when API is not available
      return [
        ...data.marketing_recommendations.slice(0, 3),
        `Consider pricing your product at ₹${data.recommended_price.toFixed(2)} based on market analysis`,
        "Focus on storytelling in your product description to connect with customers emotionally"
      ];
    } catch (error) {
      console.error("Error generating recommendations:", error);
      // Return default recommendations in case of error
      return [
        ...data.marketing_recommendations.slice(0, 3),
        `Consider pricing your product at ₹${data.recommended_price.toFixed(2)} based on market analysis`,
        "Focus on storytelling in your product description to connect with customers emotionally"
      ];
    }
  }
}