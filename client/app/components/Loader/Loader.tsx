"use client";
import React, { FC } from "react";

type Props = {};

const Loader: FC<Props> = () => {
  // Primary Color: #2190ff (Sheep Academy Blue)
  const primaryColor = "bg-[#2190ff] dark:bg-blue-500";
  const ringColor = "border-[#2190ff] dark:border-blue-500";

  return (
    // 1. Full-screen overlay: Opaque dark mode compatible background.
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-[9999]">
      
      {/* 2. The Dynamic Ping/Pulse Animation Container */}
      <div className="relative flex items-center justify-center w-24 h-24">
        
        {/* Layer 1: The Core Dot (Solid, stays) */}
        <div 
          className={`
            w-12 h-12 
            rounded-full 
            ${primaryColor} 
            shadow-xl shadow-blue-500/50 dark:shadow-blue-700/70 
            z-10 // Ensures it stays above the ping layer
          `}
        ></div>
        
        {/* Layer 2: The Outer Ring (Pings/Glows) */}
        <div 
          className={`
            absolute 
            w-12 h-12 
            rounded-full 
            border-4 ${ringColor} 
            animate-ping 
            opacity-75
          `}
        ></div>
        
        {/* Layer 3: A subtle pulse to keep the core active */}
        <div 
          className={`
            absolute 
            w-12 h-12 
            rounded-full 
            ${primaryColor} 
            opacity-75 
            animate-pulse 
            delay-500
          `}
        ></div>
        
      </div>
      
      {/* 3. Branded Loading Text */}
      <p className="mt-8 text-2xl font-semibold font-Poppins text-black dark:text-white">
        Sheep Academy
      </p>
      
      {/* 4. Sub-text for context */}
      <p className="mt-2 text-sm font-light font-Poppins text-gray-600 dark:text-gray-400">
        Loading resources...
      </p>
      
    </div>
  );
};

export default Loader;