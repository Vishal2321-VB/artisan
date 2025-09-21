import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Store, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectRole, pendingUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You need to choose whether you want to be a buyer or seller",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await selectRole(selectedRole);
      toast({
        title: "Welcome to LOCALLY!",
        description: `You have successfully registered as a ${selectedRole}`,
      });
      
      // Navigate based on role
      if (selectedRole === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set up your account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'buyer' as UserRole,
      title: 'Buyer',
      description: 'Browse and purchase handcrafted products from local artisans',
      icon: UserCheck,
      features: [
        'Browse marketplace',
        'Purchase products',
        'Follow favorite artisans',
        'Leave reviews',
        'Wishlist items'
      ]
    },
    {
      id: 'seller' as UserRole,
      title: 'Seller',
      description: 'Sell your handcrafted products and manage your artisan business',
      icon: Store,
      features: [
        'List your products',
        'Manage inventory',
        'Track sales analytics',
        'Connect with customers',
        'Build your brand'
      ]
    }
  ];

  if (!pendingUser) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Welcome to LOCALLY, {pendingUser.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your role to get started with your personalized experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedRole === role.id
                      ? 'ring-2 ring-primary border-primary shadow-lg'
                      : 'border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-center">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={handleRoleSelection}
              disabled={!selectedRole || isLoading}
              size="lg"
              className="px-8"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Setting up your account...
                </>
              ) : (
                `Continue as ${selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : 'User'}`
              )}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't worry, you can always change your role later in your account settings
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;