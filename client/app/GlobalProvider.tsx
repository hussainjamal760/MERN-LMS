'use client';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "../Provider";
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import { socketService } from './utils/socket';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SessionProvider>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Custom>{children}</Custom>
          <Toaster position='top-center' reverseOrder={false} />
        </ThemeProvider>
      </SessionProvider>
    </Providers>
  );
}

// Separate component to isolate the hook
const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      socketService.initialize();
    }
  }, [mounted]);

  // If not mounted (Server Side / Build Time), just render children directly.
  // This prevents the useLoadUserQuery hook from running on the server.
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-black">{children}</div>;
  }

  // Only run the query and show loader on the client side
  return <UserLoader>{children}</UserLoader>
}

// Isolate the query in a component that is ONLY rendered when mounted (client-side)
const UserLoader: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { isLoading } = useLoadUserQuery({});
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
      {isLoading ? <Loader/> : <>{children}</>}
    </div>
  )
}