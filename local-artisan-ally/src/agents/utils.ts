// Utility functions for AI services
export const validateApiKey = (apiKey: string): boolean => {
  // Basic validation - check if the API key is a non-empty string
  return typeof apiKey === 'string' && apiKey.length > 0;
};

export const formatCurrency = (amount: number): string => {
  // Format currency for Indian Rupees
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  // Truncate text and add ellipsis if needed
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const sanitizeInput = (input: string): string => {
  // Basic input sanitization
  return input.trim().replace(/[<>]/g, '');
};