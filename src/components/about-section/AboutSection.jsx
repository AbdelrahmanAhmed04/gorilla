import "./about-section.css";
import { Link } from "react-router-dom";
import AboutSectionBG from "../../assets/about-bg.webp";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the content sliding from left and fading in
      gsap.fromTo(
        sectionRef.current.querySelector(".about-content"),
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        sectionRef.current.querySelector(".about-cta"),
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section-container" ref={sectionRef}>
      <div
        className="about-bg-container"
        style={{
          backgroundImage: `url(${AboutSectionBG}) `,
        }}
      ></div>

      <div className="about-content">
        <h2>About</h2>
        <p>
          Based in Cairo and Riyadh, Gorilla is a creative production company
          telling bold, cinematic stories for brands across the Middle East and
          beyond.
        </p>
      </div>
      <div className="about-cta">
        <Link to="/about" className="glass-button ">
          About Us
        </Link>
        <Link to="/contact" className="cta-2 ">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

export default AboutSection;
