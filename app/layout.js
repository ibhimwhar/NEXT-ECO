import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import LayoutWrapper from "@/component/LayoutWrapper";
import { ValueProvider } from "@/component/Context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NEXT-ECO",
  description: "An Ecommerce Store",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
        >
          <ValueProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ValueProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}