// client/app/layout.tsx
import './globals.css';
import { Poppins, Josefin_Sans } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider"; 
import type { Metadata, Viewport } from 'next'; // 1. Import Viewport

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

// 2. REMOVE 'viewport' from here
export const metadata: Metadata = {
  title: "Sheep Academy",
  description: "LMS Platform - Learn Anything, Anytime",
  keywords: "online learning, LMS, courses, education",
};

// 3. ADD this separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-black`}
      >
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}