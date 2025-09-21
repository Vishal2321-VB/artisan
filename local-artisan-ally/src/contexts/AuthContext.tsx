import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; requiresRoleSelection?: boolean; error?: string }>;
  selectRole: (role: UserRole) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  pendingUser: { email: string; name: string; id: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<{ email: string; name: string; id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; requiresRoleSelection?: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll simulate different scenarios
      if (email === 'admin@locally.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        setIsLoading(false);
        return { success: true };
      }
      
      // Check if this is an existing user with a role
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (existingUser && existingUser.role) {
        const loggedInUser: User = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setIsLoading(false);
        return { success: true };
      }
      
      // For new users or users without roles, require role selection
      if (email && password) {
        const userId = existingUser ? existingUser.id : Date.now().toString();
        const userName = existingUser ? existingUser.name : email.split('@')[0];
        
        setPendingUser({
          id: userId,
          email,
          name: userName
        });
        setIsLoading(false);
        return { success: true, requiresRoleSelection: true };
      }
      
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred during sign in' };
    }
  };

  const selectRole = async (role: UserRole): Promise<void> => {
    if (!pendingUser) return;
    
    setIsLoading(true);
    
    // Create user with selected role
    const newUser: User = {
      id: pendingUser.id,
      email: pendingUser.email,
      name: pendingUser.name,
      role
    };
    
    // Save user with role
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = existingUsers.filter((u: any) => u.email !== pendingUser.email);
    updatedUsers.push({
      ...pendingUser,
      role,
      password: 'demo123' // In real app, this would be hashed
    });
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setPendingUser(null);
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (existingUsers.some((u: any) => u.email === email)) {
        setIsLoading(false);
        return { success: false, error: 'User with this email already exists' };
      }
      
      // Create pending user for role selection
      const userId = Date.now().toString();
      setPendingUser({
        id: userId,
        email,
        name
      });
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred during sign up' };
    }
  };

  const signOut = () => {
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    selectRole,
    signUp,
    signOut,
    pendingUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};