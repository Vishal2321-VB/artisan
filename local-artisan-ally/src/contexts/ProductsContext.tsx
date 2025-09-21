import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface SellerProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  images: string[];
  tags: string[];
  weight?: number;
  dimensions?: string;
  sellerId: string;
  sellerName: string;
  status: 'active' | 'inactive' | 'draft';
  dateAdded: string;
  sales: number;
  // AI Results from the workflow
  aiResults?: {
    product_story?: string;
    trend_score?: number;
    marketing_recommendations?: string[];
    final_price?: number;
    final_image?: string;
    actionable_tips?: string[];
  };
}

interface ProductsContextType {
  sellerProducts: SellerProduct[];
  addProduct: (product: Omit<SellerProduct, 'id' | 'sellerId' | 'sellerName' | 'dateAdded' | 'sales'>) => void;
  updateProduct: (id: string, updates: Partial<SellerProduct>) => void;
  deleteProduct: (id: string) => void;
  getSellerProducts: (sellerId: string) => SellerProduct[];
  getSellerStats: (sellerId: string) => {
    totalProducts: number;
    totalSales: number;
    totalRevenue: number;
    activeProducts: number;
  };
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sellerProducts, setSellerProducts] = useState<SellerProduct[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('sellerProducts');
      if (savedProducts) {
        try {
          return JSON.parse(savedProducts);
        } catch (error) {
          console.error('Error parsing saved products:', error);
          return [];
        }
      }
    }
    return [];
  });

  const { user } = useAuth();

  // Save to localStorage whenever products change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));
    }
  }, [sellerProducts]);

  const addProduct = (productData: Omit<SellerProduct, 'id' | 'sellerId' | 'sellerName' | 'dateAdded' | 'sales'>) => {
    if (!user) return;

    const newProduct: SellerProduct = {
      ...productData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      sellerId: user.id,
      sellerName: user.name,
      dateAdded: new Date().toISOString(),
      sales: 0
    };

    setSellerProducts(current => [...current, newProduct]);
    console.log('Product added:', newProduct);
  };

  const updateProduct = (id: string, updates: Partial<SellerProduct>) => {
    setSellerProducts(current =>
      current.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setSellerProducts(current => current.filter(product => product.id !== id));
  };

  const getSellerProducts = (sellerId: string) => {
    return sellerProducts.filter(product => product.sellerId === sellerId);
  };

  const getSellerStats = (sellerId: string) => {
    const products = getSellerProducts(sellerId);
    const activeProducts = products.filter(p => p.status === 'active').length;
    const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
    const totalRevenue = products.reduce((sum, product) => sum + (product.sales * product.price), 0);

    return {
      totalProducts: products.length,
      totalSales,
      totalRevenue,
      activeProducts
    };
  };

  const value: ProductsContextType = {
    sellerProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    getSellerStats
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};