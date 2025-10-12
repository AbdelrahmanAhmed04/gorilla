import "./contact-cta.css";
import ContactCta1Bg from "../../assets/contact-cta-1-bg.webp";
import ContactCta2Bg from "../../assets/contact-cta-2-bg.webp";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function ContactCta(props) {
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
        ease: 2,
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
    <div
      ref={sectionRef}
      className={
        props.variant === "1"
          ? "contact-cta-container-1 contact-cta-container"
          : props.variant === "2"
          ? "contact-cta-container-2 contact-cta-container"
          : "contact-cta-container"
      }
    >
      <div className="dark-overlay"></div>
      <div
        className="contact-bg-container"
        style={{
          backgroundImage: `url(${
            props.variant === "1" ? ContactCta1Bg : ContactCta2Bg
          }) `,
        }}
      ></div>

      <p className="contact-cta-content gsap-fade-in">
        {props.variant === "1" ? (
          <>
            Let's Create Something{" "}
            <span className="red-colored uppercase underlined">together</span>
            ...
          </>
        ) : (
          <>
            Want to <span className="uppercase">see more</span>{" "}
            <span className="red-colored">?</span>
            <br />
            Let's create something{" "}
            <span className="uppercase underlined">together</span>
            <span className="red-colored">.</span>
          </>
        )}
      </p>
      <Link
        to="/contact"
        id="glass-button-extended"
        className="glass-button gsap-fade-in"
      >
        work with us
      </Link>
    </div>
  );
}
export default ContactCta;
