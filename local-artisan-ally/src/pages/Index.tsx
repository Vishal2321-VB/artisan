import { Search, Palette, Shield, Truck, Star, Users, TrendingUp, Zap, MessageSquare, Camera, Mic, BarChart3, Globe, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";

// Import images (you may need to add these to the assets folder)
import heroImage from "@/assets/hero-artisan.jpg";

const Index = () => {
  const { t } = useTranslation();
  
  const challenges = [
    {
      title: t('landing.challenges.story.title'),
      description: t('landing.challenges.story.description'),
      icon: Palette,
    },
    {
      title: t('landing.challenges.price.title'),
      description: t('landing.challenges.price.description'),
      icon: BarChart3,
    },
    {
      title: t('landing.challenges.reach.title'),
      description: t('landing.challenges.reach.description'),
      icon: Globe,
    },
  ];

  const solutions = [
    {
      title: t('landing.solutions.storyAI.title'),
      description: t('landing.solutions.storyAI.description'),
      icon: Mic,
      mockup: "/api/placeholder/300/200",
    },
    {
      title: t('landing.solutions.trendAI.title'),
      description: t('landing.solutions.trendAI.description'),
      icon: TrendingUp,
      mockup: "/api/placeholder/300/200",
    },
    {
      title: t('landing.solutions.pricingAI.title'),
      description: t('landing.solutions.pricingAI.description'),
      icon: BarChart3,
      mockup: "/api/placeholder/300/200",
    },
    {
      title: t('landing.solutions.globalChat.title'),
      description: t('landing.solutions.globalChat.description'),
      icon: MessageSquare,
      mockup: "/api/placeholder/300/200",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Snap Photo",
      description: "Take a photo of your handcrafted product with your smartphone.",
      icon: Camera,
    },
    {
      number: "02",
      title: "Tell Story",
      description: "Share your craft's story through voice recording or text.",
      icon: Mic,
    },
    {
      number: "03",
      title: "Sell",
      description: "AI handles pricing, marketing, and connects you with global buyers.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in font-inter">
            {t('landing.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up">
            {t('landing.hero.subtitle')}
          </p>
          
          <Button size="lg" className="animate-slide-up font-inter font-semibold">
            {t('landing.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
              {t('landing.challenges.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('landing.challenges.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <challenge.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-inter">{challenge.title}</h3>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
              {t('landing.solutions.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('landing.solutions.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={solution.mockup}
                      alt={solution.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-inter">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{solution.description}</p>
                  <Button variant="ghost" size="sm">{t('common.learnMore')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 transform translate-x-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center relative">
                    <step.icon className="h-8 w-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-inter">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-inter">
            Ready to take your craft to the world?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of artisans who are already growing their business with LOCALLY's AI-powered platform.
          </p>
          <Button size="lg" className="font-inter font-semibold">
            Join the Artisan Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="locally-gradient h-8 w-8 rounded-lg"></div>
                <h3 className="text-xl font-bold font-inter">LOCALLY</h3>
              </div>
              <p className="text-background/80">
                Empowering Indian artisans through AI-powered marketplace technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-inter">For Artisans</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-primary transition-colors">Join Waitlist</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-inter">For Buyers</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-primary transition-colors">Browse Products</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Artisan Profiles</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Authenticity</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-inter">Company</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/80">
            <p>&copy; 2025 LOCALLY. All rights reserved. Made with ❤️ for artisans worldwide.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Index;
