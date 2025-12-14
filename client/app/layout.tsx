// client/app/layout.tsx
import './globals.css';
import { Poppins, Josefin_Sans } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider"; 
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: "Sheep Academy",
  description: "LMS Platform - Learn Anything, Anytime",
  keywords: "online learning, LMS, courses, education",
  viewport: "width=device-width, initial-scale=1.0",
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