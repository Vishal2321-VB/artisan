import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { hiTranslations } from './translations/hi';
import { taTranslations } from './translations/ta';
import { mrTranslations } from './translations/mr';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.marketplace": "Marketplace",
      "nav.artists": "Artists",
      "nav.about": "About",
      "nav.cart": "Cart",
      "nav.signin": "Sign In",
      "nav.sellYourArt": "Sell Your Art",

      // Landing Page
      "landing.hero.title": "Your Craft. The World's Stage.",
      "landing.hero.subtitle": "Empowering Indian artisans with AI-powered tools to automate marketing, pricing, and sales.",
      "landing.hero.cta": "Join the Artisan Waitlist",
      
      "landing.challenges.title": "The Challenge Every Artisan Faces",
      "landing.challenges.subtitle": "Traditional crafts deserve global recognition, but artisans face unique challenges in the digital world.",
      "landing.challenges.story.title": "Story",
      "landing.challenges.story.description": "Artisans struggle to tell their craft's story in a compelling way that connects with buyers globally.",
      "landing.challenges.price.title": "Price",
      "landing.challenges.price.description": "Pricing handmade items fairly is difficult without market insights and competitor analysis.",
      "landing.challenges.reach.title": "Reach",
      "landing.challenges.reach.description": "Limited access to global markets and digital marketing expertise restricts sales potential.",

      "landing.solutions.title": "AI-Powered Solutions for Every Need",
      "landing.solutions.subtitle": "Advanced technology that understands your craft and amplifies your reach.",
      "landing.solutions.storyAI.title": "Story AI",
      "landing.solutions.storyAI.description": "AI-powered storytelling that transforms your craft's history into compelling product narratives.",
      "landing.solutions.trendAI.title": "Trend AI",
      "landing.solutions.trendAI.description": "Market intelligence that identifies trending styles, colors, and demand patterns.",
      "landing.solutions.pricingAI.title": "Pricing AI",
      "landing.solutions.pricingAI.description": "Smart pricing recommendations based on materials, time, and market positioning.",
      "landing.solutions.globalChat.title": "Global Chat",
      "landing.solutions.globalChat.description": "Direct communication with buyers worldwide through integrated translation.",

      "landing.howItWorks.title": "How It Works",
      "landing.howItWorks.subtitle": "Three simple steps to transform your craft into a global business.",
      "landing.howItWorks.step1.title": "Snap Photo",
      "landing.howItWorks.step1.description": "Take a photo of your handcrafted product with your smartphone.",
      "landing.howItWorks.step2.title": "Tell Story",
      "landing.howItWorks.step2.description": "Share your craft's story through voice recording or text.",
      "landing.howItWorks.step3.title": "Sell",
      "landing.howItWorks.step3.description": "AI handles pricing, marketing, and connects you with global buyers.",

      "landing.testimonials.title": "Success Stories",
      "landing.testimonials.subtitle": "Real artisans sharing their journey with LOCALLY.",

      "landing.finalCTA.title": "Ready to take your craft to the world?",
      "landing.finalCTA.subtitle": "Join thousands of artisans who are already growing their business with LOCALLY's AI-powered platform.",
      "landing.finalCTA.button": "Join the Artisan Waitlist",

      // Product Discovery
      "discovery.title": "Discover Authentic Indian Crafts",
      "discovery.subtitle": "Explore unique handcrafted products from talented artisans across India",
      "discovery.search.placeholder": "Search for products, artisans, or crafts...",
      "discovery.search.button": "Search",
      "discovery.imageSearch": "Image Search",
      "discovery.filters": "Filters",
      "discovery.featuredArtisans": "Featured Artisans",
      "discovery.newArrivals": "New Arrivals",
      "discovery.trendingCrafts": "Trending Crafts",
      "discovery.allProducts": "All Products",
      "discovery.loadMore": "Load More Products",
      "discovery.viewAll": "View All",
      "discovery.exploreAll": "Explore All",

      // Product Detail
      "product.addToCart": "Add to Cart",
      "product.addToWishlist": "Add to Wishlist",
      "product.share": "Share",
      "product.chatWithArtisan": "Chat with Artisan",
      "product.meetTheMaker": "Meet the Maker",
      "product.viewArtisanProfile": "View Artisan Profile",
      "product.storyTitle": "The Story Behind This Craft",
      "product.detailsAndDimensions": "Details & Dimensions",
      "product.shippingInformation": "Shipping Information",
      "product.careInstructions": "Care Instructions",
      "product.customerReviews": "Customer Reviews",
      "product.viewAllReviews": "View All Reviews",
      "product.moreFromArtisan": "More from this Artisan",
      "product.freeShipping": "Free Shipping",
      "product.easyReturns": "Easy Returns",
      "product.authentic": "Authentic",
      "product.verified": "Verified",
      "product.inStock": "in stock",

      // Artisan Profile
      "artisan.verifiedBy": "Verified by LOCALLY",
      "artisan.contactArtisan": "Contact Artisan",
      "artisan.follow": "Follow",
      "artisan.about": "About",
      "artisan.products": "Products",
      "artisan.stats": "Artisan Stats",
      "artisan.totalSales": "Total Sales",
      "artisan.completionRate": "Completion Rate",
      "artisan.responseTime": "Response Time",
      "artisan.specialties": "Specialties",
      "artisan.awards": "Awards & Recognition",
      "artisan.recentReviews": "Recent Reviews",
      "artisan.since": "Since",

      // Common
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.continue": "Continue",
      "common.back": "Back",
      "common.next": "Next",
      "common.previous": "Previous",
      "common.all": "All",
      "common.new": "New",
      "common.featured": "Featured",
      "common.trending": "Trending",
      "common.verified": "Verified",
      "common.learnMore": "Learn More",
      "common.viewMore": "View More",
      "common.showLess": "Show Less",

      // Footer
      "footer.forArtisans": "For Artisans",
      "footer.joinWaitlist": "Join Waitlist",
      "footer.howItWorks": "How It Works",
      "footer.successStories": "Success Stories",
      "footer.support": "Support",
      "footer.forBuyers": "For Buyers",
      "footer.browseProducts": "Browse Products",
      "footer.artisanProfiles": "Artisan Profiles",
      "footer.authenticity": "Authenticity",
      "footer.shipping": "Shipping",
      "footer.company": "Company",
      "footer.about": "About",
      "footer.contact": "Contact",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.copyright": "© 2025 LOCALLY. All rights reserved. Made with ❤️ for artisans worldwide."
    }
  },
  hi: {
    translation: hiTranslations
  },
  ta: {
    translation: taTranslations
  },
  mr: {
    translation: mrTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;