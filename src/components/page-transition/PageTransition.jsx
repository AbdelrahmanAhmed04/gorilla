import React, { createContext, useContext } from "react";

// Page transitions have been removed — provide no-op provider and hook
const PageTransitionContext = createContext({ start: async () => {}, end: async () => {} });

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  return ctx || { start: async () => {}, end: async () => {} };
}

export function PageTransitionProvider({ children }) {
  // no-op provider to avoid breaking existing imports
  return <>{children}</>;
}

export default PageTransitionProvider;
