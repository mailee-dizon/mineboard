"use client";

import { useUI } from "@/context/UIContext";
import { NAVBAR_WIDTH_EXPANDED, NAVBAR_WIDTH_COLLAPSED } from "@/constants/layout";

export default function MainContent({ children }) {
  const { isCollapsed } = useUI();

  const navWidth = isCollapsed ? NAVBAR_WIDTH_COLLAPSED : NAVBAR_WIDTH_EXPANDED;

  return (
    <main
      style={{
        marginTop: 80,
        marginLeft: navWidth,
        padding: "10px 30px",   // symmetric left/right now
        transition: "margin-left 0.3s",
      }}
    >
      {children}
    </main>
  );
}
