// Simple test script to verify AIService functionality
import { AIService } from "./AIService";
import { ProductData } from "./types";

async function testAIService() {
  console.log("Testing AIService...");
  
  // Test data
  const testData: ProductData = {
    product_name: "Handcrafted Ceramic Vase",
    category: "Pottery & Ceramics",
    description: "Beautiful hand-thrown ceramic vase with intricate glazing patterns",
    tags: ["handmade", "ceramic", "vase", "decorative"],
    price: 45.99
  };
  
  try {
    console.log("1. Testing environment configuration...");
    const apiToken = import.meta.env.VITE_HF_API_TOKEN;
    if (!apiToken || apiToken === 'your_actual_huggingface_api_token_here') {
      console.log("⚠️  API token not configured. Please add your Hugging Face API token to .env file");
      console.log("   Visit https://huggingface.co/settings/tokens to get a free token");
      return;
    }
    console.log("✅ API token found");
    
    console.log("2. Testing story generation...");
    const story = await AIService.generateStory(testData);
    console.log("✅ Story generated successfully");
    console.log("   Story preview:", story.substring(0, 100) + "...");
    
    console.log("3. Testing trend analysis...");
    const trendData = await AIService.analyzeTrend(testData);
    console.log("✅ Trend analysis completed");
    console.log("   Trend score:", trendData.trend_score);
    console.log("   Recommendations count:", trendData.marketing_recommendations.length);
    
    console.log("4. Testing price determination...");
    const priceData = {
      ...testData,
      trend_score: trendData.trend_score
    };
    const price = await AIService.determinePrice(priceData);
    console.log("✅ Price determination completed");
    console.log("   Recommended price: ₹", price);
    
    console.log("5. Testing recommendations...");
    const recommendations = await AIService.generateRecommendations({
      story,
      trend_score: trendData.trend_score,
      recommended_price: price,
      marketing_recommendations: trendData.marketing_recommendations
    });
    console.log("✅ Recommendations generated");
    console.log("   Number of recommendations:", recommendations.length);
    
    console.log("\n🎉 All tests completed successfully!");
    console.log("The AIService is working correctly with Hugging Face API.");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.log("\nTroubleshooting tips:");
    console.log("1. Make sure you have a valid Hugging Face API token in your .env file");
    console.log("2. Check your internet connection");
    console.log("3. Verify the Hugging Face API is accessible");
  }
}

// Run the test
testAIService();