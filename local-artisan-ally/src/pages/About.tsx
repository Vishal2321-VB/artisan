import { Heart, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import heroArtisan from "@/assets/hero-artisan.jpg";

const About = () => {
  const stats = [
    { icon: Users, label: "Active Artisans", value: "500+" },
    { icon: Award, label: "Products Sold", value: "10,000+" },
    { icon: Globe, label: "Cities Covered", value: "50+" },
    { icon: Heart, label: "Happy Customers", value: "25,000+" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: heroArtisan,
      description: "Passionate about supporting local artisans and preserving traditional crafts."
    },
    {
      name: "Raj Kumar",
      role: "Head of Artisan Relations",
      image: heroArtisan,
      description: "Connecting talented craftspeople with customers who appreciate quality."
    },
    {
      name: "Emily Chen",
      role: "Tech Lead",
      image: heroArtisan,
      description: "Building technology that makes handmade products accessible to everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            About LOCALLY
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to connect local artisans with customers who value authentic, 
            handmade products. Our platform celebrates traditional craftsmanship while providing 
            modern tools for artisans to grow their businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Join Our Community
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-6">
                Traditional crafts are disappearing as mass production takes over. We believe 
                there's immense value in handmade products - not just in their uniqueness, 
                but in the stories, skills, and heritage they represent.
              </p>
              <p className="text-muted-foreground mb-6">
                LOCALLY provides a digital marketplace where skilled craftspeople can 
                showcase their work, reach new customers, and build sustainable businesses 
                while preserving age-old traditions.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <Heart className="h-5 w-5 text-primary mr-3" />
                  Support local artisans and their communities
                </li>
                <li className="flex items-center">
                  <Award className="h-5 w-5 text-primary mr-3" />
                  Preserve traditional craftsmanship
                </li>
                <li className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-3" />
                  Connect makers with global customers
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src={heroArtisan}
                alt="Artisan at work"
                className="rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-card">
                <CardContent className="p-0">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team dedicated to empowering artisans and 
              connecting them with customers who appreciate handmade quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-card">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <Card className="border-0 shadow-elegant bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Join the LOCALLY Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're an artisan looking to showcase your work or a customer 
                seeking unique handmade products, we'd love to have you join us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  Start Selling
                </Button>
                <Button variant="outline" size="lg">
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;