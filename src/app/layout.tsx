import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navbar from "@/components/Navbar"; 

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "BFA",
  description: "Building Futures Academy - Nonprofit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(outfit.className, "text-primary-foreground")}>
        <Navbar /> 
        {children} 
      </body>
    </html>
  );
}