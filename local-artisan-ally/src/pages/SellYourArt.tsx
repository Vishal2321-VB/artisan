import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, X, DollarSign, Package, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/contexts/ProductsContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { AIProductForm } from "@/agents/components/AIProductForm";

const SellYourArt = () => {
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [formData, setFormData] = useState(() => {
    // Load saved form data from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sellYourArt_formData');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // If parsing fails, return default
        }
      }
    }
    return {
      title: '',
      category: '',
      description: '',
      price: '',
      originalPrice: '',
      quantity: '',
      weight: '',
      dimensions: ''
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResults, setAiResults] = useState<any>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  
  const { addProduct } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFormData = {
      ...formData,
      [e.target.id]: e.target.value
    };
    setFormData(newFormData);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('sellYourArt_formData', JSON.stringify(newFormData));
    }
  };

  const handleCategoryChange = (value: string) => {
    const newFormData = {
      ...formData,
      category: value
    };
    setFormData(newFormData);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('sellYourArt_formData', JSON.stringify(newFormData));
    }
  };

  const runAIAnalysis = async () => {
    // Check if required fields are filled
    if (!formData.title?.trim() || !formData.category?.trim() || !formData.description?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the product name, category, and description before running AI analysis.",
        variant: "destructive"
      });
      return null;
    }

    setIsAIProcessing(true);
    
    try {
      // Import the AI service dynamically to avoid issues with Vite
      const { AIService } = await import('@/agents/AIService');
      
      // Prepare product data for AI
      const productData = {
        product_name: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        tags: tags,
        price: parseFloat(formData.price) || 0
      };

      // Step 1: Generate story
      const product_story = await AIService.generateStory(productData);
      
      // Step 2: Analyze trend
      const { trend_score, marketing_recommendations } = await AIService.analyzeTrend(productData);
      
      // Update product data with trend score for price determination
      const updatedProductData = { ...productData, trend_score };
      
      // Step 3: Determine price
      const final_price = await AIService.determinePrice(updatedProductData);
      
      // Step 4: Enhance photo (using a placeholder image for now)
      const final_image = images[0] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400";
      
      // Step 5: Generate recommendations
      const actionable_tips = await AIService.generateRecommendations({
        story: product_story,
        trend_score,
        recommended_price: final_price,
        marketing_recommendations
      });
      
      const workflowResult = {
        product_story,
        trend_score,
        marketing_recommendations,
        final_price,
        final_image,
        actionable_tips
      };
      
      setAiResults(workflowResult);
      return workflowResult;
    } catch (error) {
      toast({
        title: "AI Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to run AI analysis",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    console.log("Form submission started, user:", user, "isAuthenticated:", isAuthenticated);
    
    if (!isAuthenticated || user?.role !== 'seller') {
      toast({
        title: "Access Denied",
        description: "You need to be signed in as a seller to add products. Please sign in and select 'Seller' role.",
        variant: "destructive"
      });
      // Navigate to sign in page
      navigate('/signin');
      return;
    }

    // Enhanced validation with specific field feedback
    const validationErrors: string[] = [];
    
    if (!formData.title?.trim()) {
      validationErrors.push("Product title is required");
    }
    if (!formData.category?.trim()) {
      validationErrors.push("Category is required");
    }
    if (!formData.description?.trim()) {
      validationErrors.push("Product description is required");
    }
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      validationErrors.push("Valid price is required");
    }
    if (!formData.quantity || isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) <= 0) {
      validationErrors.push("Valid quantity is required");
    }
    
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join(", "),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Run AI analysis if not already done
      let results = aiResults;
      if (!results && !isDraft) {
        console.log("Running AI analysis before product submission...");
        results = await runAIAnalysis();
        // Continue even if AI analysis fails - we have fallbacks
      }

      const productData = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice && !isNaN(parseFloat(formData.originalPrice)) ? parseFloat(formData.originalPrice) : undefined,
        quantity: parseInt(formData.quantity),
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'], // Default image if none uploaded
        tags,
        weight: formData.weight && !isNaN(parseFloat(formData.weight)) ? parseFloat(formData.weight) : undefined,
        dimensions: formData.dimensions?.trim() || undefined,
        status: isDraft ? 'draft' as const : 'active' as const,
        // Add AI results to product data
        aiResults: results
      };

      console.log("Adding product to context...", productData);
      addProduct(productData);

      toast({
        title: isDraft ? "Draft Saved" : "Product Listed",
        description: isDraft 
          ? "Your product has been saved as a draft" 
          : "Your product has been successfully listed on the marketplace"
      });

      // Reset form and clear localStorage
      const emptyFormData = {
        title: '',
        category: '',
        description: '',
        price: '',
        originalPrice: '',
        quantity: '',
        weight: '',
        dimensions: ''
      };
      setFormData(emptyFormData);
      setImages([]);
      setTags([]);
      setAiResults(null);
      
      // Clear persisted form data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sellYourArt_formData');
      }

      // Navigate to seller dashboard
      if (!isDraft) {
        console.log("Navigating to seller dashboard...");
        setTimeout(() => {
          navigate('/seller-dashboard');
        }, 1000); // Small delay to show success message
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Textiles & Fabrics",
    "Pottery & Ceramics", 
    "Jewelry & Accessories",
    "Wood & Bamboo Crafts",
    "Metalwork",
    "Paintings & Art",
    "Home Decor",
    "Leather Goods"
  ];

  const addImage = () => {
    if (images.length < 5) {
      // Create a hidden file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.multiple = false;
      
      fileInput.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          // Check if file is an image
          if (!file.type.match('image.*')) {
            toast({
              title: "Invalid file type",
              description: "Please select an image file (JPEG, PNG, GIF, etc.)",
              variant: "destructive"
            });
            return;
          }
          
          // Check file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            toast({
              title: "File too large",
              description: "Please select an image smaller than 5MB",
              variant: "destructive"
            });
            return;
          }
          
          // Convert to base64 for preview
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setImages(prevImages => [...prevImages, event.target?.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      
      fileInput.click();
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Status Debug Info */}
          {(!isAuthenticated || user?.role !== 'seller') && (
            <Card className="border-2 border-orange-200 bg-orange-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-600 font-medium">⚠️ Authentication Required</span>
                </div>
                <p className="text-sm text-orange-700 mb-3">
                  {!isAuthenticated 
                    ? "You need to sign in as a seller to list products." 
                    : `You're signed in as a ${user?.role}, but need seller access to list products.`
                  }
                </p>
                <div className="flex gap-2">
                  {!isAuthenticated ? (
                    <Button 
                      onClick={() => navigate('/signin')} 
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Sign In as Seller
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate('/role-selection')} 
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Select Seller Role
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Sell Your Art
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your beautiful handmade creations with the world. Join thousands of artisans 
              who are building successful businesses on LOCALLY.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Earn More</h3>
                <p className="text-sm text-muted-foreground">
                  Keep 85% of your sales. No hidden fees or monthly charges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Easy Setup</h3>
                <p className="text-sm text-muted-foreground">
                  List your products in minutes with our simple tools.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <Palette className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Showcase Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful product pages that highlight your craftsmanship.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Product Enhancement */}
          <Card className="border-0 shadow-elegant mb-6">
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
                  onClick={runAIAnalysis} 
                  disabled={isAIProcessing || isSubmitting}
                  className="flex-1"
                >
                  {isAIProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Run AI Analysis
                    </>
                  )}
                </Button>
              </div>
              
              {aiResults && (
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">AI Recommendations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background/50 backdrop-blur p-4 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">
                        ₹{aiResults.final_price?.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">Optimal Price</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur p-4 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {(aiResults.trend_score * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Market Trend Score</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur p-4 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {aiResults.marketing_recommendations?.length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Marketing Tips</div>
                    </div>
                  </div>
                  {aiResults.product_story && (
                    <div className="mt-4 p-4 bg-background/50 backdrop-blur rounded-lg border border-primary/10">
                      <h4 className="font-medium text-foreground mb-2">Enhanced Product Story:</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {aiResults.product_story}
                      </p>
                    </div>
                  )}
                  {aiResults.marketing_recommendations && aiResults.marketing_recommendations.length > 0 && (
                    <div className="mt-4 p-4 bg-background/50 backdrop-blur rounded-lg border border-primary/10">
                      <h4 className="font-medium text-foreground mb-3">Marketing Suggestions:</h4>
                      <ul className="space-y-2">
                        {aiResults.marketing_recommendations.slice(0, 3).map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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

          {/* Product Form */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Add Your Product</CardTitle>
              <CardDescription>
                Fill in the details below to list your handmade product
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your product name"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product, materials used, crafting process, and what makes it special..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Available *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="1"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <Label>Product Images *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {images.length < 5 && (
                      <button
                        type="button"
                        onClick={addImage}
                        className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors"
                      >
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Add Image</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload up to 5 high-quality images. First image will be the main product photo.
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tags (e.g., handmade, vintage, gift)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                          {tag}
                          <X
                            className="h-3 w-3 ml-1 hover:text-destructive"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Shipping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (grams)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="0"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                    <Input
                      id="dimensions"
                      placeholder="e.g., 10 x 5 x 3"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-6">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    size="lg" 
                    disabled={isSubmitting || isAIProcessing}
                    onClick={(e) => handleSubmit(e, false)}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        {isAIProcessing ? 'Running AI Analysis...' : 'Listing Product...'}
                      </>
                    ) : (
                      'List Product'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1" 
                    size="lg"
                    disabled={isSubmitting || isAIProcessing}
                    onClick={(e) => handleSubmit(e, true)}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Draft'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SellYourArt;