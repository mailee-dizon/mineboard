// src/app/layout.jsx 
'use client';
import { AuthProvider } from "@/context/AuthContext";
import { ClerkProvider } from "@clerk/nextjs";
import { minecraftFont } from "./fonts";
import "./globals.css";
import { UserSync } from "@/components/UserSync/UserSync";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={minecraftFont.variable}>
        <body className="font-minecraft">
          <UserSync/>
            {children}
        </body>
      </html>
    </ClerkProvider>

  );
}