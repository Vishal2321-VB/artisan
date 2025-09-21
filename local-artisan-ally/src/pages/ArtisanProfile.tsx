import { useState } from "react";
import { Star, MapPin, Calendar, ShieldCheck, MessageCircle, Heart, Share2, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";
import ProductCard from "@/components/ProductCard";

// Import images
import potteryImage from "@/assets/pottery-collection.jpg";
import jewelryBoxImage from "@/assets/wooden-jewelry-box.jpg";
import scarfImage from "@/assets/handwoven-scarf.jpg";
import silverJewelryImage from "@/assets/silver-jewelry.jpg";

const ArtisanProfile = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock artisan data
  const artisan = {
    id: "priya-sharma",
    name: "Priya Sharma",
    craft: "Traditional Blue Pottery",
    location: "Jaipur, Rajasthan",
    joinedYear: 2018,
    profileImage: "/api/placeholder/150/150",
    bannerImage: "/api/placeholder/1200/400",
    verified: true,
    rating: 4.9,
    reviewCount: 342,
    totalSales: 1250,
    productCount: 89,
    completionRate: 99.2,
    responseTime: "2 hours",
    bio: "Master potter with over 25 years of experience in traditional Rajasthani blue pottery. My family has been practicing this ancient art for four generations, passed down from my grandmother who learned from Persian artisans. I specialize in creating beautiful, functional dinnerware, decorative pieces, and custom ceremonial items using only natural dyes and traditional firing techniques.\n\nMy workshop is located in the heart of Jaipur's pottery district, where I work alongside other skilled artisans to preserve this 400-year-old craft. Each piece I create is unique, reflecting the rich cultural heritage of Rajasthan while meeting modern quality standards for everyday use.\n\nI'm passionate about sharing the stories behind each creation and connecting with customers who appreciate authentic, handcrafted art.",
    specialties: [
      "Blue Pottery Dinnerware",
      "Decorative Vases",
      "Traditional Tiles",
      "Custom Ceremonial Pieces"
    ],
    awards: [
      "Rajasthan State Craft Award 2022",
      "UNESCO Craft Excellence Recognition 2021",
      "National Handicrafts Award 2020"
    ],
    certifications: [
      "Traditional Craft Master Certification",
      "Food-Safe Pottery Certification",
      "Export Quality Assurance"
    ]
  };

  // Mock products data
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: (i + 1).toString(),
    title: [
      "Handcrafted Blue Pottery Dinner Set",
      "Traditional Ceramic Vase",
      "Blue Pottery Tea Set",
      "Decorative Wall Tiles",
      "Ceramic Serving Bowls",
      "Hand-painted Dinner Plates",
      "Traditional Water Pitcher",
      "Ceramic Spice Containers",
    ][i % 8],
    price: Math.floor(Math.random() * 6000) + 1500,
    originalPrice: i % 3 === 0 ? Math.floor(Math.random() * 2000) + 7000 : undefined,
    image: [potteryImage, jewelryBoxImage, scarfImage, silverJewelryImage][i % 4],
    artisan: artisan.name,
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 150) + 20,
    category: ["Dinnerware", "Decorative", "Tableware", "Kitchen"][i % 4],
    isNew: i < 3,
    inStock: Math.random() > 0.1
  }));

  const categories = ["All", "Dinnerware", "Decorative", "Tableware", "Kitchen"];

  const reviews = [
    {
      id: 1,
      author: "Anjali Mehta",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely stunning craftsmanship! The blue pottery set I ordered exceeded my expectations. Priya's attention to detail and the story behind each piece made this purchase truly special.",
      product: "Blue Pottery Dinner Set",
      verified: true
    },
    {
      id: 2,
      author: "Rohit Gupta",
      rating: 5,
      date: "1 month ago",
      comment: "Exceptional quality and beautiful traditional patterns. Fast shipping and excellent packaging. Will definitely order again!",
      product: "Traditional Ceramic Vase",
      verified: true
    },
    {
      id: 3,
      author: "Sarah Johnson",
      rating: 4,
      date: "2 months ago",
      comment: "Love the authenticity and the personal touch in communication. The pieces are exactly as described and photos don't do justice to the actual beauty.",
      product: "Blue Pottery Tea Set",
      verified: true
    }
  ];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={artisan.bannerImage}
          alt={`${artisan.name}'s workshop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <img
                  src={artisan.profileImage}
                  alt={artisan.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                />
                {artisan.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-secondary rounded-full p-2">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-4xl font-bold font-inter">{artisan.name}</h1>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary">
                    Verified by LOCALLY
                  </Badge>
                </div>
                <p className="text-lg md:text-xl text-white/90 mb-2">{artisan.craft}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {artisan.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Since {artisan.joinedYear}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {artisan.rating} ({artisan.reviewCount} reviews)
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" variant="default">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Artisan
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-foreground">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-inter">About {artisan.name}</h2>
                <div className="prose prose-gray max-w-none">
                  {artisan.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Products Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-inter">Products ({filteredProducts.length})</h2>
                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 font-inter">Artisan Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Sales</span>
                    <span className="font-medium">{artisan.totalSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products</span>
                    <span className="font-medium">{artisan.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">{artisan.completionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">{artisan.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 font-inter">Specialties</h3>
                <div className="space-y-2">
                  {artisan.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards & Recognition */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 font-inter">Awards & Recognition</h3>
                <div className="space-y-3">
                  {artisan.awards.map((award, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 font-inter">Recent Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default ArtisanProfile;