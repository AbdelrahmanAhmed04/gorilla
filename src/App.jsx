import { useRef, useLayoutEffect, useEffect } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about-section/AboutSection";
import Footer from "./components/footer/Footer";
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
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-container" ref={containerRef}>
          <Hero />
          <AboutSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
