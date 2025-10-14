"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Providers from "../app/Providers"; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Providers>
          <Header />
          <main
            className="
              mt-[60px] min-h-[calc(100vh-60px)] p-6
              w-full md:w-[calc(100%-300px)] md:ml-[300px]
              transition-all duration-300
              bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,0.2)_100%)]
              text-white
            "
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
