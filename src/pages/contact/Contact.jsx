import "./contact.css";
import Footer from "../../components/footer/Footer";
import ContactHero from "../../components/contact-hero/ContactHero";
import Navbar from "../../components/navbar/Navbar";
import LeadForm from "../../components/lead-form/LeadForm";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocationSection from "../../components/location-section/LocationSection";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Contact() {
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
          <Navbar variant="transparent" />
          <ContactHero />
          <div className="contact-section-container">
            <LocationSection />
            <LeadForm />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Contact;
