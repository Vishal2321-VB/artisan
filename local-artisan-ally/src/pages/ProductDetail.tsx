import { useState } from "react";
import { Heart, Share2, ShoppingCart, MessageCircle, Star, ShieldCheck, Truck, RotateCcw, ChevronLeft, ChevronRight, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";

// Import images
import potteryImage from "@/assets/pottery-collection.jpg";
import jewelryBoxImage from "@/assets/wooden-jewelry-box.jpg";
import scarfImage from "@/assets/handwoven-scarf.jpg";

const ProductDetail = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id: "1",
    title: "Handcrafted Blue Pottery Dinner Set",
    price: 4599,
    originalPrice: 6499,
    images: [potteryImage, jewelryBoxImage, scarfImage, potteryImage],
    artisan: {
      name: "Priya Sharma",
      location: "Jaipur, Rajasthan",
      image: "/api/placeholder/100/100",
      verified: true,
      rating: 4.9,
      reviewCount: 156,
      joinedYear: 2018,
      totalProducts: 89,
      bio: "Master potter with 25+ years of experience in traditional Rajasthani blue pottery. My family has been practicing this art for four generations, and I specialize in creating beautiful, food-safe dinnerware using natural dyes and traditional techniques."
    },
    rating: 4.8,
    reviewCount: 234,
    category: "Pottery",
    inStock: true,
    stockCount: 12,
    story: "This exquisite blue pottery dinner set is handcrafted using a 400-year-old technique that originated in Persia and was brought to Rajasthan by Mughal emperors. Each piece is shaped on a potter's wheel, painted with natural cobalt blue dye, and fired at high temperatures to create the distinctive blue and white pattern. The set includes 6 dinner plates, 6 bowls, and a serving platter, perfect for hosting family gatherings with authentic Indian craftsmanship.",
    features: [
      "100% handmade using traditional techniques",
      "Food-safe glazing with natural dyes",
      "Microwave and dishwasher safe",
      "Set includes 6 plates, 6 bowls, 1 platter",
      "Unique patterns - no two pieces identical"
    ],
    dimensions: "Plates: 10\" diameter, Bowls: 6\" diameter, Platter: 14\" diameter",
    materials: "Natural clay, cobalt blue dye, food-safe glaze",
    careInstructions: "Hand wash recommended, avoid extreme temperature changes"
  };

  const reviews = [
    {
      id: 1,
      author: "Anjali Mehta",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely beautiful! The craftsmanship is exceptional and the blue patterns are stunning. Perfect for special occasions.",
      verified: true
    },
    {
      id: 2,
      author: "Rohit Gupta",
      rating: 4,
      date: "1 month ago",
      comment: "Great quality pottery. The plates are the perfect size and the colors are vibrant. Delivery was careful and well-packaged.",
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: "2",
      title: "Blue Pottery Tea Set",
      price: 2899,
      image: potteryImage,
      artisan: "Priya Sharma",
      rating: 4.7
    },
    {
      id: "3", 
      title: "Ceramic Serving Bowls",
      price: 1599,
      image: jewelryBoxImage,
      artisan: "Kavya Ceramics",
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                disabled={selectedImageIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImageIndex(Math.min(product.images.length - 1, selectedImageIndex + 1))}
                disabled={selectedImageIndex === product.images.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 font-inter">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <Badge variant="destructive" className="text-sm">
                  Save ₹{product.originalPrice! - product.price}
                </Badge>
              </div>
            </div>

            {/* Meet the Maker Block */}
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 font-inter flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Meet the Maker
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={product.artisan.image}
                    alt={product.artisan.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold font-inter">{product.artisan.name}</h4>
                      {product.artisan.verified && (
                        <ShieldCheck className="h-4 w-4 text-secondary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {product.artisan.location}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{product.artisan.rating}★ ({product.artisan.reviewCount} reviews)</span>
                      <span>{product.artisan.totalProducts} products</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Artisan Profile
                </Button>
              </CardContent>
            </Card>

            {/* Story Block */}
            <div>
              <h3 className="font-semibold mb-3 font-inter">The Story Behind This Craft</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.story}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockCount} in stock
                </span>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Global Chat Button */}
            <Button variant="secondary" size="lg" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Artisan
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">Orders over ₹999</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs font-medium">Easy Returns</div>
                <div className="text-xs text-muted-foreground">15-day policy</div>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs font-medium">Authentic</div>
                <div className="text-xs text-muted-foreground">Verified artisan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Accordion */}
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-semibold font-inter">
                Details & Dimensions
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dimensions:</h4>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Materials:</h4>
                  <p className="text-muted-foreground">{product.materials}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-semibold font-inter">
                Shipping Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-muted-foreground">
                  <p>• Free shipping on orders over ₹999</p>
                  <p>• Standard delivery: 5-7 business days</p>
                  <p>• Express delivery: 2-3 business days (₹99)</p>
                  <p>• Carefully packaged to prevent damage</p>
                  <p>• Track your order with SMS and email updates</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-semibold font-inter">
                Care Instructions
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{product.careInstructions}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 font-inter">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{review.author}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="mt-6">View All Reviews</Button>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 font-inter">More from this Artisan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2 font-inter">{relatedProduct.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {relatedProduct.artisan}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{relatedProduct.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default ProductDetail;