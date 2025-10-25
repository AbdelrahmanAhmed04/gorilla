import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./scroll-progress.css";

export default function ScrollProgress() {
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const fill = progressFillRef.current;
    if (!fill) return;

    // initialize
    gsap.set(fill, { scaleY: 0 });
    // quickTo creates a fast, reusable tween function that smoothly animates
    // the `scaleY` property with low overhead. We'll call this from rAF.
    const smoothTo = gsap.quickTo(fill, "scaleY", {
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });

    let rafId = null;

    function getScrollProgress() {
      const scroller = document.scrollingElement || document.documentElement;
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight;
      const clientHeight = window.innerHeight || scroller.clientHeight;
      const max = Math.max(scrollHeight - clientHeight, 1);
      return Math.min(Math.max(scrollTop / max, 0), 1);
    }

    function update() {
      const progress = getScrollProgress();
      // animate smoothly to the new progress value
      smoothTo(progress);
      rafId = null;
    }

    function onScroll() {
      if (rafId == null) rafId = requestAnimationFrame(update);
    }

    function onResize() {
      if (rafId == null) rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial update
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
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
