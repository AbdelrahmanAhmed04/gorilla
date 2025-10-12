import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../loading-context/LoadingContext";

function RouteLoadingHandler() {
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();
  const isInitialMount = useRef(true);
  const loadingTimeoutRef = useRef(null);

  useEffect(() => {
    // Don't show loading on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Show loading immediately for route changes
    showLoading("Loading page...");

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Hide loading after 3 seconds minimum
    loadingTimeoutRef.current = setTimeout(() => {
      hideLoading();
    }, 3000);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

export default RouteLoadingHandler;
