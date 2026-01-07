// src/app/(main)/layout.jsx
"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar/NavBar"; 
import TopBar from "@/components/TopBar/TopBar";

export default function MainLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <TopBar isCollapsed={isCollapsed}/>
      <NavBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main 
        style={{
          marginTop: 80,
          marginLeft: isCollapsed ? "60px" : "200px",
          paddingTop: 10,
          paddingLeft: isCollapsed ? 40 : 50,
          transition: "margin-left 0.3s",
        }}
      >
         {children}
      </main>
    </>
  );
}