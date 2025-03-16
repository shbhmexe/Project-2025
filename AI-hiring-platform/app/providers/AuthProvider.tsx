"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, memo } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

// Memoize the AuthProvider to prevent unnecessary re-renders
export const AuthProvider = memo(function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider 
      // Add session caching options for better performance
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={false} // Don't refetch on window focus
    >
      {children}
    </SessionProvider>
  );
}); 