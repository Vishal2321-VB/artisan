import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, TrendingUp, Users, DollarSign, Edit, Trash2, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductsContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { AIRecommendations } from '@/agents/components/AIRecommendations';

const SellerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { getSellerProducts, getSellerStats, deleteProduct } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    activeProducts: 0
  });

  // Redirect if not authenticated or not a seller
  useEffect(() => {
    let isMounted = true;
    
    if (!isAuthenticated) {
      if (isMounted) {
        navigate('/signin');
      }
      return;
    }
    
    if (user?.role !== 'seller' && user?.role !== 'admin') {
      if (isMounted) {
        toast({
          title: "Access Denied",
          description: "You need to be a seller to access this page",
          variant: "destructive"
        });
        navigate('/');
      }
      return;
    }
    
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user, navigate, toast]);

  // Load seller's products and stats
  useEffect(() => {
    if (user) {
      loadSellerData();
    }
  }, [user]);

  const loadSellerData = () => {
    if (!user) return;
    
    const sellerProducts = getSellerProducts(user.id);
    const sellerStats = getSellerStats(user.id);
    
    setProducts(sellerProducts);
    setStats({
      totalProducts: sellerStats.totalProducts,
      totalSales: sellerStats.totalSales,
      totalRevenue: sellerStats.totalRevenue,
      activeProducts: sellerStats.activeProducts
    });
  };

  const handleAddProduct = () => {
    navigate('/sell-your-art');
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: "Product editing feature coming soon!"
    });
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    loadSellerData(); // Refresh data
    toast({
      title: "Product Deleted",
      description: "Product has been removed from your store"
    });
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!isAuthenticated || (user?.role !== 'seller' && user?.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your products and track your sales.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProducts}</div>
              <p className="text-xs text-muted-foreground">+{stats.activeProducts} active products</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                  Manage your product inventory and sales
                </CardDescription>
              </div>
              <Button onClick={handleAddProduct} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No products yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start by adding your first product to your store
                </p>
                <Button onClick={handleAddProduct} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Added {new Date(product.dateAdded).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.quantity === 0 ? 'text-red-600' : ''}>
                          {product.quantity === 0 ? 'Out of stock' : product.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SellerDashboard;