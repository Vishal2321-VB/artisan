import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface AIRecommendationsProps {
  recommendations: string[];
  trendScore: number;
  recommendedPrice: number;
}

export function AIRecommendations({ recommendations, trendScore, recommendedPrice }: AIRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Actionable insights to improve your product's performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold text-sm text-muted-foreground">Trend Score</h3>
            <p className="text-2xl font-bold">{(trendScore * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold text-sm text-muted-foreground">Recommended Price</h3>
            <p className="text-2xl font-bold">₹{recommendedPrice.toFixed(2)}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold text-sm text-muted-foreground">Suggestions</h3>
            <p className="text-2xl font-bold">{recommendations.length}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Marketing Recommendations</h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((rec, index) => (
              <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                {rec}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}