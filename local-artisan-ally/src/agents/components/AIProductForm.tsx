import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/agents/useAIWorkflow";
import { ProductData } from "@/agents/types";
import { Mic, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIProductFormProps {
  onAIResults: (results: any) => void;
  productData: Partial<ProductData>;
}

export function AIProductForm({ onAIResults, productData }: AIProductFormProps) {
  const { runAIWorkflow, isProcessing, result, error } = useAIWorkflow();
  const { toast } = useToast();
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  const handleRunAI = async () => {
    if (!productData.product_name || !productData.category || !productData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the product name, category, and description before running AI analysis.",
        variant: "destructive"
      });
      return;
    }

    const data: ProductData = {
      product_name: productData.product_name || "",
      category: productData.category || "",
      description: productData.description || "",
      tags: productData.tags || [],
      price: productData.price || 0
    };

    const results = await runAIWorkflow(data);
    
    if (results) {
      onAIResults(results);
      toast({
        title: "AI Analysis Complete",
        description: "The AI has generated recommendations for your product."
      });
    } else if (error) {
      toast({
        title: "AI Analysis Failed",
        description: error,
        variant: "destructive"
      });
    }
  };

  const handleVoiceInput = () => {
    setIsVoiceRecording(true);
    toast({
      title: "Voice Recording",
      description: "Voice recording simulation started. In a real application, this would capture your voice input."
    });
    
    // Simulate voice recording for 3 seconds
    setTimeout(() => {
      setIsVoiceRecording(false);
      toast({
        title: "Voice Input Processed",
        description: "Your voice input has been converted to text and added to the description."
      });
    }, 3000);
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI-Powered Product Enhancement
        </CardTitle>
        <CardDescription>
          Use our AI tools to optimize your product listing for better sales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleRunAI} 
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Run AI Analysis
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleVoiceInput}
            disabled={isVoiceRecording}
            className="flex-1"
          >
            {isVoiceRecording ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recording...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Voice Description
              </>
            )}
          </Button>
        </div>
        
        {result && (
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">AI Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Optimal price: ₹{result.final_price.toFixed(2)}</li>
              <li>Market trend score: {(result.trend_score * 100).toFixed(0)}%</li>
              <li>{result.marketing_recommendations.length} marketing suggestions generated</li>
            </ul>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Our AI analyzes your product to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate compelling product stories</li>
            <li>Predict market demand and trends</li>
            <li>Recommend optimal pricing</li>
            <li>Provide marketing suggestions</li>
            <li>Enhance product images</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}