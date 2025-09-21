import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Search, Menu, X, MessageCircle, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const cartCount = getTotalItems();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/marketplace?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  console.log('Current cart count:', cartCount); // Debug log

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="artisan-gradient h-8 w-8 rounded-lg"></div>
          <a href="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity cursor-pointer">
            LOCALLY
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/marketplace" className="text-foreground hover:text-primary transition-smooth">
            {t('nav.marketplace')}
          </a>
          <a href="/about" className="text-foreground hover:text-primary transition-smooth">
            {t('nav.about')}
          </a>
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search handmade products..."
              className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" asChild>
            <a href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </a>
          </Button>

          {isAuthenticated && user ? (
            <>
              {/* Show different buttons based on user role */}
              {user.role === 'seller' && (
                <>
                  <Button variant="hero" size="sm" className="hidden md:flex" asChild>
                    <a href="/seller-dashboard">Dashboard</a>
                  </Button>
                  <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                    <a href="/sell-your-art">{t('nav.sellYourArt')}</a>
                  </Button>
                </>
              )}

              {/* User dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  {user.role === 'seller' && (
                    <DropdownMenuItem asChild>
                      <a href="/seller-dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </a>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="default" size="sm" className="hidden md:flex" asChild>
                <a href="/signin">{t('nav.signin')}</a>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden border-t transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto p-4 space-y-4">
          {/* Mobile Search */}
          <div className="container mx-auto p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search handmade products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2">
            <a href="/marketplace" className="text-foreground hover:text-primary transition-smooth py-2">
              {t('nav.marketplace')}
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-smooth py-2">
              {t('nav.about')}
            </a>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex space-x-2">
            {isAuthenticated && user ? (
              <>
                {user.role === 'seller' && (
                  <>
                    <Button variant="hero" size="sm" className="flex-1" asChild>
                      <a href="/seller-dashboard">Dashboard</a>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href="/sell-your-art">{t('nav.sellYourArt')}</a>
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="default" size="sm" className="flex-1" asChild>
                  <a href="/signin">{t('nav.signin')}</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;