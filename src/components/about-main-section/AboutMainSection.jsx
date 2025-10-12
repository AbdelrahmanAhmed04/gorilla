import "./about-main-section.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutMainSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const whoWeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".who-we",
          start: "top 80%",
          once: true,
        },
      });

      const about2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-container-2",
          start: "top 80%",
          once: true,
        },
      });

      // Set initial states
      gsap.set(".who-we .gsap-fade-in", { opacity: 0, y: 30 });
      gsap.set(".about-container-2 .gsap-fade-in", { opacity: 0, y: 30 });

      // Animate who-we section
      whoWeTl.to(".who-we .gsap-fade-in", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: {
          amount: 0.3,
          from: "start",
        },
      });

      // Animate about-container-2 section
      about2Tl.to(".about-container-2 .gsap-fade-in", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: {
          amount: 0.3,
          from: "start",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-main" ref={sectionRef}>
      <div className="who-we">
        <div className="who-we__title__container gsap-fade-in">
          <h2 className="who-we__title gsap-fade-in">About</h2>
          <div className="vertical-break gsap-fade-in"></div>
        </div>
        <div className="who-we__intro gsap-fade-in">
          <div className="who-we__content gsap-fade-in">
            <h3 className="gsap-fade-in">who we are</h3>
            <div className="who-we__categories gsap-fade-in">
              <p className="category gsap-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="5"
                    transform="matrix(-1 0 0 1 10 -0.000244141)"
                    fill="#CC3333"
                  />
                </svg>
                Bold stories
              </p>
              <p className="category gsap-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="5"
                    transform="matrix(-1 0 0 1 10 -0.000244141)"
                    fill="#CC3333"
                  />
                </svg>
                Cinematic craft
              </p>
              <p className="category gsap-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="5"
                    transform="matrix(-1 0 0 1 10 -0.000244141)"
                    fill="#CC3333"
                  />
                </svg>
                Middle Eastern roots
              </p>
            </div>
          </div>
          <div className="who-we__bio gsap-fade-in">
            <h3 className="gsap-fade-in">bio</h3>
            <p className="gsap-fade-in">
              Gorilla is a creative production house based in Cairo and Riyadh.
              We specialize in commercials, films, and branded content that
              connect brands with audiences. Our mission is to merge cinematic
              storytelling with marketing insight, delivering work that
              resonates across cultures and platforms.
            </p>
          </div>
        </div>
      </div>
      <div className="about-container-2">
        <h2 className="mobile-title gsap-fade-in">About</h2>
        <div className="about-2-content gsap-fade-in">
          <div className="our-approch-container gsap-fade-in">
            <h3 className="gsap-fade-in">our approach</h3>
            <div className="services-container gsap-fade-in">
              <div className="service gsap-fade-in">
                <h4 className="gsap-fade-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="5"
                      transform="matrix(-1 0 0 1 10 -0.000244141)"
                      fill="#CC3333"
                    />
                  </svg>
                  creative vision
                </h4>
                <p className="gsap-fade-in">
                  We bring bold, original ideas to life.
                </p>
              </div>
              <div className="service gsap-fade-in">
                <h4 className="gsap-fade-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="5"
                      transform="matrix(-1 0 0 1 10 -0.000244141)"
                      fill="#CC3333"
                    />
                  </svg>
                  technical excellence
                </h4>
                <p className="gsap-fade-in">
                  From high-end cinematography to post-production, we ensure
                  world-class quality.
                </p>
              </div>
              <div className="service gsap-fade-in">
                <h4 className="gsap-fade-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="5"
                      transform="matrix(-1 0 0 1 10 -0.000244141)"
                      fill="#CC3333"
                    />
                  </svg>
                  collaborative spirit
                </h4>
                <p className="gsap-fade-in">
                  We partner closely with agencies, brands, and creatives to
                  deliver authentic stories.
                </p>
              </div>
            </div>
          </div>
          <div className="our-presence-container gsap-fade-in">
            <h3>our presence</h3>
            <p>
              <span className="bold">EG – KSA</span> <br />
              With roots in Cairo and a presence in Riyadh, Gorilla works across
              the Middle East, delivering stories that reflect both regional
              identity and global standards.
            </p>
          </div>
        </div>
        <div className="title-container gsap-fade-in">
          <h2 className="title gsap-fade-in">About</h2>
          <div className="vertical-break gsap-fade-in"></div>
        </div>
      </div>
    </section>
  );
}

export default AboutMainSection;
