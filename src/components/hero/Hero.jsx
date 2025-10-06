import "./hero.css";
import { Link } from "react-router-dom";
import HeroBg from "../../assets/hero-bg.webp";
import HeroLogo from "../../assets/logo-black-outlined.svg";
import { CountryContext } from "../../country-context/CountryContext";
import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const { setCountry } = useContext(CountryContext);
  const heroRef = useRef(null);

  useEffect(() => {
    const fadeEls = heroRef.current.querySelectorAll(".gsap-fade-in");
    gsap.set(fadeEls, { opacity: 0, y: 30 });

    gsap.to(fadeEls, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        once: true,
      },
      onComplete: () => {
        fadeEls.forEach((el) => el.classList.remove("gsap-fade-in"));
      },
    });

    // Improved scaling, border-radius, and background color on scroll
    gsap.to(heroRef.current, {
      scale: 0.9,
      backgroundColor: "#f7f7fa", // main light color
      ease: "power1.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5, // lower value for smoother, more responsive effect
      },
    });
  }, []);

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${HeroBg})` }}
      ref={heroRef}
    >
      <div className="countries-container">
        <Link
          to="/projects"
          onClick={() => setCountry("eg")}
          className="gsap-fade-in"
        >
          eg
        </Link>
        <Link
          to="/projects"
          onClick={() => setCountry("ksa")}
          className="gsap-fade-in"
        >
          ksa
        </Link>
      </div>
      <div className="logo-container gsap-fade-in">
        <img src={HeroLogo} alt="Gorilla Logo" />
      </div>
      <div className="hero-navigation">
        <Link to="/projects" className="glass-button gsap-fade-in">
          projects
        </Link>
        <Link to="/about" className="glass-button gsap-fade-in">
          about
        </Link>
        <Link to="/contact" className="glass-button gsap-fade-in">
          contact
        </Link>
      </div>
    </div>
  );
}

export default Hero;
