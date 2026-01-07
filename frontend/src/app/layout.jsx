// src/app/layout.jsx 
'use client';
import { AuthProvider } from "@/context/AuthContext";
import { minecraftFont } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={minecraftFont.variable}>
      <body className="font-minecraft">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}