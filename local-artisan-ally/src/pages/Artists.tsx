import { Search, MapPin, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import heroArtisan from "@/assets/hero-artisan.jpg";

const Artists = () => {
  const artists = [
    {
      id: "1",
      name: "Priya Sharma",
      specialty: "Handwoven Textiles",
      location: "Rajasthan, India",
      rating: 4.9,
      reviewCount: 156,
      image: heroArtisan,
      description: "Master weaver with 20 years of experience in traditional Rajasthani textiles.",
      products: 45
    },
    {
      id: "2", 
      name: "Arjun Patel",
      specialty: "Pottery & Ceramics",
      location: "Gujarat, India",
      rating: 4.8,
      reviewCount: 89,
      image: heroArtisan,
      description: "Creating beautiful pottery pieces using ancient techniques passed down through generations.",
      products: 32
    },
    {
      id: "3",
      name: "Meera Reddy",
      specialty: "Silver Jewelry",
      location: "Hyderabad, India", 
      rating: 4.9,
      reviewCount: 203,
      image: heroArtisan,
      description: "Handcrafted silver jewelry inspired by South Indian temple art and traditions.",
      products: 67
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Meet Our Talented Artisans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the skilled craftspeople behind every unique piece. Each artisan brings generations of tradition and expertise to create beautiful handmade products.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search artisans by name or craft..."
              className="pl-10"
            />
          </div>
        </section>

        {/* Artisan Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id} className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-primary text-primary-foreground mb-2">
                    {artist.specialty}
                  </Badge>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {artist.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {artist.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(artist.rating)
                              ? "fill-accent text-accent"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {artist.rating} ({artist.reviewCount})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {artist.products} products
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="default" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Artists;