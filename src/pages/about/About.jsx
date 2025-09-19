import { useRef, useLayoutEffect, useEffect } from "react";
import "./about.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AboutMainSection from "../../components/about-main-section/AboutMainSection";
import ContactCta from "../../components/contact-cta/ContactCta";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

function About() {
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
          <Navbar variant="light" active="about" />
          <AboutMainSection />
          <ContactCta variant="2" />

          <Footer />
        </div>
      </div>
    </>
  );
}
export default About;
