"use client";

import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <UIContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
