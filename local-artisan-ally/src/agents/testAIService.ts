// Simple test to verify AI service functionality
import { AIService } from "./AIService";
import { ProductData } from "./types";

async function testAIService() {
  console.log("Testing AI Service...");
  
  const testData: ProductData = {
    product_name: "Handcrafted Ceramic Vase",
    category: "Pottery & Ceramics",
    description: "Beautiful hand-thrown ceramic vase with intricate glazing patterns",
    tags: ["handmade", "ceramic", "vase", "decorative"],
    price: 45.99
  };
  
  try {
    console.log("Testing story generation...");
    const story = await AIService.generateStory(testData);
    console.log("Story:", story);
    
    console.log("Testing trend analysis...");
    const trendData = await AIService.analyzeTrend(testData);
    console.log("Trend Data:", trendData);
    
    console.log("Testing price determination...");
    const priceData = {
      ...testData,
      trend_score: trendData.trend_score
    };
    const price = await AIService.determinePrice(priceData);
    console.log("Recommended Price:", price);
    
    console.log("Testing recommendations...");
    const recommendations = await AIService.generateRecommendations({
      story,
      trend_score: trendData.trend_score,
      recommended_price: price,
      marketing_recommendations: trendData.marketing_recommendations
    });
    console.log("Recommendations:", recommendations);
    
    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testAIService();