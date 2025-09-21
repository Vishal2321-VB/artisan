export interface ProductData {
  product_name: string;
  category: string;
  description: string;
  tags: string[];
  price: number;
  trend_score?: number;
  image?: string;
  making_price?: number;
  current_price?: number;
}

export interface AIWorkflowResult {
  product_story: string;
  trend_score: number;
  marketing_recommendations: string[];
  final_price: number;
  final_image: string;
  actionable_tips: string[];
}