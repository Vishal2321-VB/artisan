// Test file to verify the AI service implementation
import { AIService } from "./AIService";
import { ProductData } from "./types";

async function testAIService() {
  console.log("Testing AI Service with Hugging Face...");
  
  // Test data
  const testData: ProductData = {
    product_name: "Handcrafted Ceramic Vase",
    category: "Pottery & Ceramics",
    description: "Beautiful hand-thrown ceramic vase with intricate glazing patterns",
    tags: ["handmade", "ceramic", "vase", "decorative"],
    price: 45.99
  };
  
  try {
    console.log("1. Testing story generation...");
    const story = await AIService.generateStory(testData);
    console.log("Story generated successfully:");
    console.log(story.substring(0, 100) + "...");
    
    console.log("\n2. Testing trend analysis...");
    const trendData = await AIService.analyzeTrend(testData);
    console.log("Trend analysis completed:");
    console.log(`Trend Score: ${trendData.trend_score}`);
    console.log(`Recommendations: ${trendData.marketing_recommendations.length}`);
    
    console.log("\n3. Testing price determination...");
    const priceData = {
      ...testData,
      trend_score: trendData.trend_score
    };
    const price = await AIService.determinePrice(priceData);
    console.log("Price determination completed:");
    console.log(`Recommended Price: ₹${price}`);
    
    console.log("\n4. Testing recommendations...");
    const recommendations = await AIService.generateRecommendations({
      story,
      trend_score: trendData.trend_score,
      recommended_price: price,
      marketing_recommendations: trendData.marketing_recommendations
    });
    console.log("Recommendations generated:");
    console.log(`Number of recommendations: ${recommendations.length}`);
    
    console.log("\n✅ All tests completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ Test failed:", error);
    return false;
  }
}

// Run the test
testAIService();