import MainSectionBg from "../../assets/contact-hero-bg.webp";
import "./contact-hero.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ContactHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide dark overlay to reveal background image
      const overlay = sectionRef.current.querySelector(".dark-overlay");
      gsap.to(overlay, {
        xPercent: 100,
        duration: 0.7,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Fade in content
      const fadeEls = sectionRef.current.querySelectorAll(".gsap-fade-in");
      gsap.set(fadeEls, { opacity: 0, y: 30 });

      gsap.to(fadeEls, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        onComplete: () => {
          fadeEls.forEach((el) => el.classList.remove("gsap-fade-in"));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-hero-container" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div
        className="contact-hero-bg-container"
        style={{ backgroundImage: `url(${MainSectionBg})` }}
      ></div>
      <h3 className="gsap-fade-in">
        Let's Create Something <span className="uppercase">together</span>
      </h3>
      <p className="gsap-fade-in">
        We're here to bring your ideas to life. Reach out and let's talk.
      </p>
    </section>
  );
}
export default ContactHero;
