import { useState, useEffect } from "react";
import { Camera, Filter, SlidersHorizontal, Star, MapPin, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/contexts/ProductsContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";
import ProductCard from "@/components/ProductCard";

// Import images
import potteryImage from "@/assets/pottery-collection.jpg";
import jewelryBoxImage from "@/assets/wooden-jewelry-box.jpg";
import scarfImage from "@/assets/handwoven-scarf.jpg";
import silverJewelryImage from "@/assets/silver-jewelry.jpg";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisan: string;
  rating: number;
  reviewCount: number;
  category: string;
  region: string;
  color: string;
  sellerId?: string;
  sellerName?: string;
}

const ProductDiscovery = () => {
  const { user } = useAuth();
  const [selectedCraft, setSelectedCraft] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  
  // Create diverse product data with varied images and details
  const allProducts: Product[] = Array.from({ length: 60 }, (_, i) => {
    const productVariations = [
      {
        titles: ["Handcrafted Ceramic Bowl Set", "Blue Pottery Dinner Set", "Traditional Clay Bowls", "Glazed Ceramic Collection"],
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        category: "Dinnerware"
      },
      {
        titles: ["Carved Wooden Jewelry Box", "Handcrafted Keepsake Box", "Vintage Wood Storage", "Artisan Carved Box"],
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
        category: "Decorative"
      },
      {
        titles: ["Handwoven Cotton Scarf", "Traditional Silk Dupatta", "Block Print Stole", "Embroidered Shawl"],
        images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"],
        category: "Textiles"
      },
      {
        titles: ["Silver Gemstone Jewelry", "Traditional Necklace Set", "Handcrafted Earrings", "Vintage Silver Ring"],
        images: ["https://images.unsplash.com/photo-1515562141207-7a83aaa4cab7?w=400", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400"],
        category: "Jewelry"
      },
      {
        titles: ["Brass Kitchen Utensils", "Copper Water Bottle", "Traditional Cookware", "Metal Serving Set"],
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"],
        category: "Kitchen"
      },
      {
        titles: ["Wooden Garden Planter", "Bamboo Home Decor", "Handcrafted Furniture", "Natural Wood Art"],
        images: ["https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=400", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        category: "Furniture"
      }
    ];
    
    const artisans = [
      "Maya Pottery Studio", "Rajesh Woodworks", "Priya Textiles", "Arjun Jewelers",
      "Kavya Ceramics", "Vikram Crafts", "Sunita Arts", "Ravi Metalworks",
      "Lotus Handicrafts", "Heritage Crafts", "Royal Artisans", "Traditional Makers",
      "Craft Village Co.", "Artisan Collective", "Master Craftsmen", "Cultural Creations",
      "Golden Thread Studio", "Earth & Fire Pottery", "Silk Route Textiles", "Jewel Craft House",
      "Nature's Touch", "Ancient Arts Studio", "Modern Traditions", "Craft Masters Guild"
    ];
    
    const regions = ["Rajasthan", "Gujarat", "Maharashtra", "Kerala", "West Bengal", "Uttar Pradesh", "Tamil Nadu", "Karnataka"];
    const colors = ["Blue", "Red", "Green", "Yellow", "White", "Black", "Brown", "Silver", "Gold", "Multicolor"];
    
    const variation = productVariations[i % productVariations.length];
    const titleIndex = Math.floor(i / productVariations.length) % variation.titles.length;
    const imageIndex = i % variation.images.length;
    
    return {
      id: (i + 1).toString(),
      title: variation.titles[titleIndex],
      price: Math.floor(Math.random() * 8000) + 500,
      originalPrice: i % 5 === 0 ? Math.floor(Math.random() * 3000) + 8000 : undefined,
      image: variation.images[imageIndex],
      artisan: artisans[i % artisans.length],
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 300) + 10,
      category: variation.category,
      region: regions[i % regions.length],
      color: colors[i % colors.length],
    };
  });
  
  // Filter products based on role
  const filteredProducts = allProducts.filter(product => {
    // For buyers, show all products
    if (!user || user.role === 'buyer') {
      return true;
    }
    // For sellers, show only their products
    return product.sellerId === user.id;
  });
  
  // Create dynamic featured artisans from actual sellers
  useEffect(() => {
    const artisanMap = new Map();
    
    // Use filteredProducts for featured artisans
    filteredProducts.forEach(product => {
      if (!artisanMap.has(product.sellerId)) {
        artisanMap.set(product.sellerId, {
          id: product.sellerId,
          name: product.sellerName,
          craft: product.category,
          location: "India", // You could add location to product data later
          image: "/api/placeholder/150/150",
          verified: true,
          productCount: 1
        });
      } else {
        const artisan = artisanMap.get(product.sellerId);
        artisan.productCount += 1;
      }
    });
    
    setFeaturedArtisans(Array.from(artisanMap.values()));
  }, [filteredProducts]);

  // New Arrivals Data
  const newArrivals = [
    {
      id: "new1",
      title: "Hand-painted Ceramic Dinner Set",
      price: 3499,
      image: potteryImage,
      artisan: "Kavya Ceramics",
      location: "Rajasthan",
      addedDays: 2,
    },
    {
      id: "new2",
      title: "Silver Filigree Pendant",
      price: 2899,
      image: silverJewelryImage,
      artisan: "Arjun Jewelers",
      location: "Odisha",
      addedDays: 1,
    },
  ];

  // Trending Crafts Data
  const trendingCrafts = [
    {
      id: "trend1",
      name: "Blue Pottery",
      image: "/api/placeholder/300/200",
      productCount: 156,
      trendingUp: 45,
    },
    {
      id: "trend2",
      name: "Kalamkari Art",
      image: "/api/placeholder/300/200",
      productCount: 89,
      trendingUp: 32,
    },
    {
      id: "trend3",
      name: "Brass Handicrafts",
      image: "/api/placeholder/300/200",
      productCount: 203,
      trendingUp: 28,
    },
  ];

  const crafts = ["All", "Dinnerware", "Decorative", "Kitchen", "Jewelry", "Textiles", "Furniture"];
  const regions = ["All", "Rajasthan", "Gujarat", "Maharashtra", "Kerala", "West Bengal", "Uttar Pradesh", "Tamil Nadu", "Karnataka"];
  const colors = ["All", "Blue", "Red", "Green", "Yellow", "White", "Black", "Brown", "Silver", "Gold", "Multicolor"];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - No Search Bar */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
              {user?.role === 'seller' ? "Showcase Your Craft" : "Discover Authentic Indian Crafts"}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {user?.role === 'seller' 
                ? "List your handmade products and connect with buyers"
                : "Explore unique handcrafted products from talented artisans across India"
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Filter Options */}
      <section className="py-4 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {crafts.map((craft) => (
                <Button
                  key={craft}
                  variant={selectedCraft === craft ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCraft(craft)}
                >
                  {craft}
                </Button>
              ))}
            </div>
            
            {/* Apply Filters Button */}
            <Button 
              variant="default" 
              size="sm"
              className="ml-auto"
              onClick={() => {
                // Filter logic is already applied in real-time, this button shows filter count
                console.log('Filters applied:', { selectedCraft, selectedRegion, selectedColor, priceRange });
              }}
            >
              Apply Filters ({filteredProducts.length})
            </Button>
          </div>
          
          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-6 mt-6 p-6 bg-background rounded-lg border">
              <div>
                <h4 className="font-medium mb-3 font-inter">Region</h4>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox 
                        id={region} 
                        checked={selectedRegion === region}
                        onCheckedChange={() => setSelectedRegion(region)}
                      />
                      <label htmlFor={region} className="text-sm cursor-pointer">
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 font-inter">Color</h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox 
                        id={color} 
                        checked={selectedColor === color}
                        onCheckedChange={() => setSelectedColor(color)}
                      />
                      <label htmlFor={color} className="text-sm cursor-pointer">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 font-inter">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Artisans Section - Dynamic */}
      <section className="py-12">
        {user?.role !== 'seller' && (
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-inter">
              Featured Artisans
            </h2>
            
            {featuredArtisans.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No featured artisans yet. Be the first to showcase your crafts!
                </p>
                <Button variant="outline" asChild>
                  <a href="/sell-your-art">Start Selling</a>
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArtisans.map((artisan) => (
                  <Card key={artisan.id} className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={artisan.image}
                          alt={artisan.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold font-inter">{artisan.name}</h3>
                            {artisan.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {artisan.craft} • {artisan.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {artisan.productCount} products
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-inter">
              New Arrivals
            </h2>
            <Button variant="ghost">View All</Button>
          </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {product.addedDays}d ago
                    </Badge>
                    <h3 className="font-semibold mb-2 font-inter">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {product.artisan}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">₹{product.price}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Crafts Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-inter">
              Trending Crafts
            </h2>
            <Button variant="ghost">Explore All</Button>
          </div>
            
          <div className="grid md:grid-cols-3 gap-6">
            {trendingCrafts.map((craft) => (
              <Card key={craft.id} className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-inter">{craft.name}</h3>
                      <div className="flex items-center text-secondary text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{craft.trendingUp}%
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {craft.productCount} products available
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-inter">
              All Products
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section - Seller Only */}
      {user?.role === 'seller' && (
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-inter text-center">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Showcase your artisan story and craft expertise to potential buyers
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Products</h3>
                <p className="text-muted-foreground">
                  Add high-quality photos and detailed descriptions of your handmade items
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
                <p className="text-muted-foreground">
                  Connect with buyers and grow your artisan business on LOCALLY
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button asChild>
                <a href="/sell-your-art">Get Started Selling</a>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <ChatWidget />
    </div>
  );
};

export default ProductDiscovery;