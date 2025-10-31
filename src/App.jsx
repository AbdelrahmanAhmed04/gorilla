// TODO: Implement a GSAP page transition.
// Requirements:
// 1. Create a reusable <PageTransition /> component with a full-screen div.
// 2. When a route change happens, animate this div:
//    - Slide in from the left.
//    - Show a centered GIF for ~1.5s.
//    - Slide back to the left revealing the new page.
// 3. Use GSAP for all animations.
// 4. Keep the code minimal and clean.

import { useRef, useLayoutEffect, useEffect } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/hero/Hero";
import HomepageProjects from "./components/homepage-projects-section/HomepageProjects";
import ScrollProgress from "./components/scroll-progress/ScrollProgress";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const images = import.meta.glob("./assets/*.{jpg,png,webp}", { eager: true });

function usePreloadAssets() {
  useEffect(() => {
    Object.values(images).forEach((module) => {
      const img = new Image();
      img.src = module.default; // module.default is the URL
    });
  }, []);
}

function App() {
  var wrapperRef = useRef();
  var containerRef = useRef();
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: containerRef.current,
      smooth: 0.8,
      speed: 1.4,
      effects: true,
    });

    return () => smoother.kill();
  }, []);
  usePreloadAssets();
  return (
    <>
      <ScrollProgress />
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-container" ref={containerRef}>
          <Hero />
          <HomepageProjects />
        </div>
      </div>
    </>
  );
}

export default App;
