import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-progress.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const bar = progressBarRef.current;
    const fill = progressFillRef.current;
    if (!bar || !fill) return;

    gsap.set(fill, { scaleY: 0 });

    let trigger = null;

    function getScroller() {
      // If ScrollSmoother is active the smooth wrapper/container exists.
      // Prefer the smooth wrapper (outer element) then the container, else fall back to document.scrollingElement.
      return (
        document.querySelector(".smooth-wrapper") ||
        document.querySelector(".smooth-container") ||
        document.scrollingElement ||
        document.documentElement
      );
    }

    function createTrigger() {
      const scroller = getScroller();
      // Kill previous trigger if present
      if (trigger) {
        try {
          trigger.kill();
        } catch (e) {}
        trigger = null;
      }

      // Use ScrollTrigger with explicit scroller when available
      trigger = ScrollTrigger.create({
        scroller: scroller === document.documentElement ? window : scroller,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Update fill scale directly for best performance
          gsap.set(fill, { scaleY: self.progress });
        },
      });
    }

    // Create initially
    createTrigger();

    // Recreate when layout changes (smooth scroller may be added/removed on route changes)
    const ro = new MutationObserver(() => {
      // If the smooth-wrapper appears or disappears, recreate trigger
      createTrigger();
    });
    ro.observe(document.body, { childList: true, subtree: true });

    // Also recreate on resize (in case content height changes)
    const onResize = () => createTrigger();
    window.addEventListener("resize", onResize);

    return () => {
      if (trigger)
        try {
          trigger.kill();
        } catch (e) {}
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="scroll-progress-container" ref={progressBarRef} aria-hidden>
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" ref={progressFillRef} />
      </div>
    </div>
  );
}
