// Simple test script to verify OpenAI integration
import OpenAI from "openai";

// This is a simple test to verify the OpenAI package is working
// In a real application, you would use the API key from environment variables
const testOpenAI = async () => {
  console.log("Testing OpenAI package import...");
  
  try {
    // This will fail without a valid API key, but we're just testing the import
    const openai = new OpenAI({
      apiKey: "test-key", // This is just for testing the import
      dangerouslyAllowBrowser: true
    });
    
    console.log("OpenAI package imported successfully!");
    console.log("OpenAI client created:", !!openai);
    
    // Test if the chat completions method exists
    console.log("Chat completions method exists:", !!openai.chat.completions);
    
    return true;
  } catch (error) {
    console.error("Error testing OpenAI package:", error);
    return false;
  }
};

// Run the test
testOpenAI().then(success => {
  if (success) {
    console.log("OpenAI integration test completed successfully!");
  } else {
    console.log("OpenAI integration test failed.");
  }
});