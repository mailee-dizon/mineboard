"use client";

import { useUI } from "@/context/UIContext";

export default function MainContent({ children }) {
  const { isCollapsed } = useUI();

  return (
    <main
        style={{
          marginTop: 80,
          marginLeft: isCollapsed ? "30px" : "170px",
          paddingTop: 10,
          paddingLeft: isCollapsed ? 40 : 50,
          transition: "margin-left 0.3s",
        }}>
          {children}
    </main>
  );
}