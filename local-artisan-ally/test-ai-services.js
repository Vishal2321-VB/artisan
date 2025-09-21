// Simple test script to verify AI services are working
// This script can be run in the browser console when on the test page

console.log("Testing AI services connectivity...");

// Check if we can access the AIService module
import("/src/agents/AIService.ts").then(module => {
  console.log("✅ AIService module loaded successfully");
  console.log("Available methods:", Object.keys(module.AIService));
  
  // Test data
  const testData = {
    product_name: "Handcrafted Ceramic Vase",
    category: "Pottery & Ceramics",
    description: "Beautiful hand-thrown ceramic vase with intricate glazing patterns",
    tags: ["handmade", "ceramic", "vase", "decorative"],
    price: 45.99
  };
  
  console.log("🧪 Testing story generation...");
  module.AIService.generateStory(testData)
    .then(story => {
      console.log("✅ Story generation successful");
      console.log("Story preview:", story.substring(0, 100) + "...");
    })
    .catch(error => {
      console.log("❌ Story generation failed:", error.message);
    });
  
}).catch(error => {
  console.log("❌ Failed to load AIService module:", error);
});

// Check environment variables
console.log("Checking environment configuration...");
const apiToken = import.meta.env.VITE_HF_API_TOKEN;
if (apiToken && apiToken !== "your_actual_huggingface_api_token_here") {
  console.log("✅ API token is configured");
} else {
  console.log("⚠️ API token not configured - please add it to .env file");
}