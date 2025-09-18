import { useRef, useLayoutEffect } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about-section/AboutSection";
import Footer from "./components/footer/Footer";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
