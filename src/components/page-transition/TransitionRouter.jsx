import { useRef, useState, useEffect, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "./PageTransition.jsx";

// Wrapper that delays route rendering until the PageTransition animation completes.
export default function TransitionRouter({ routesElement }) {
  const location = useLocation();
  const transitionRef = useRef(null);
  const isInitialMount = useRef(true);

  // The location we render. Starts with current location so initial render shows page immediately.
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);

  // Play reveal on initial mount with GIF
  useEffect(() => {
    let mounted = true;
    const runInitial = async () => {
      if (transitionRef.current && transitionRef.current.reveal) {
        try {
          // Show GIF only on initial load
          await transitionRef.current.reveal(true);
        } catch (e) {
          /* ignore */
        }
      }
      if (!mounted) return;
      isInitialMount.current = false;
    };
    runInitial();
    return () => {
      mounted = false;
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If location changes (user navigated), and it's different from what we render,
    // play the cover animation on the previous page, then switch routes, then
    // play the reveal animation on the new page.
    if (location.pathname === displayLocation.pathname) return;

    let mounted = true;

    const run = async () => {
      setIsAnimating(true);
      try {
        if (transitionRef.current && transitionRef.current.cover) {
          await transitionRef.current.cover();
        }
      } catch (e) {
        // ignore and continue
      }

      if (!mounted) return;
      // switch displayed route while overlay is covering
      setDisplayLocation(location);

      try {
        if (transitionRef.current && transitionRef.current.reveal) {
          // Don't show GIF for page changes, only initial load
          await transitionRef.current.reveal(false);
        }
      } catch (e) {
        // ignore
      }

      if (!mounted) return;
      setIsAnimating(false);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [location, displayLocation]);

  // Render the provided Routes element but force the `location` prop to the
  // last committed location so the new page doesn't appear until the
  // transition completes.
  return (
    <>
      <PageTransition ref={transitionRef} />
      {routesElement && typeof routesElement === "object"
        ? cloneElement(routesElement, { location: displayLocation })
        : null}
    </>
  );
}
