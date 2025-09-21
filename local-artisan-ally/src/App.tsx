import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import ProductDiscovery from "./pages/Marketplace";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import RoleSelection from "./pages/RoleSelection";
import SellYourArt from "./pages/SellYourArt";
import SellerDashboard from "./pages/SellerDashboard";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import ArtisanProfile from "./pages/ArtisanProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <TooltipProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/marketplace" element={<ProductDiscovery />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/role-selection" element={<RoleSelection />} />
                  <Route path="/sell-your-art" element={<SellYourArt />} />
                  <Route 
                    path="/seller-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['seller', 'admin']}>
                        <SellerDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/artisan/:id" element={<ArtisanProfile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
