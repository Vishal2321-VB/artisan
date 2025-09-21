import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisan: string;
  rating: number;
  reviewCount: number;
  category: string;
  isFavorite?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  artisan,
  rating,
  reviewCount,
  category,
  isFavorite = false,
  className,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Adding product to cart:', { id, title, price, image, artisan }); // Debug log
    addToCart({
      id,
      title,
      price,
      image,
      artisan,
    });
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    });
    console.log('Product added successfully'); // Debug log
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-105",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isLiked && "fill-red-500 text-red-500"
                )}
              />
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-accent text-accent-foreground font-medium">
              -{discount}%
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Favorite Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked && "fill-red-500 text-red-500"
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Title */}
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Artisan */}
        <p className="text-sm text-muted-foreground">
          by <span className="font-medium text-foreground">{artisan}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <Button
            variant="default"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;