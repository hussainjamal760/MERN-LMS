'use client'
import './globals.css';
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import {Toaster} from "react-hot-toast"
import {Providers} from "../Provider"
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import React, { useState, useEffect } from 'react';
import { socketService } from './utils/socket'; // Import socket service

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning
        className={`${poppins.variable} ${josefin.variable}`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
                <Custom> {children} </Custom>  
              </div>
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom : React.FC<{children : React.ReactNode}> = ({children})=>{
  const {isLoading} = useLoadUserQuery({})
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize socket connection ONCE when app mounts
  useEffect(() => {
    if (mounted) {
      console.log("🎯 Initializing global socket connection...");
      socketService.initialize();
      
      return () => {
        // Cleanup on unmount
        console.log("🧹 Cleaning up socket on unmount");
      };
    }
  }, [mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return(
    <>
      {
        isLoading ? <Loader/> : <>{children}</>
      }
    </>
  )
}