// Simple test script to verify Hugging Face integration
async function testHuggingFace() {
  console.log("Testing Hugging Face API integration...");
  
  try {
    // Test if we can access the environment variable
    const apiToken = import.meta.env.VITE_HF_API_TOKEN;
    
    if (!apiToken) {
      console.log("Hugging Face API token not found in environment variables");
      console.log("Please set VITE_HF_API_TOKEN in your .env file");
      return false;
    }
    
    console.log("Hugging Face API token found");
    
    // Test a simple API call to check connectivity
    const response = await fetch("https://huggingface.co/api/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "GET"
    });
    
    if (response.ok) {
      console.log("Hugging Face API connectivity test successful!");
      return true;
    } else {
      console.log("Hugging Face API connectivity test failed:", response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error testing Hugging Face integration:", error);
    return false;
  }
}

// Run the test
testHuggingFace().then(success => {
  if (success) {
    console.log("Hugging Face integration test completed successfully!");
  } else {
    console.log("Hugging Face integration test failed.");
  }
});